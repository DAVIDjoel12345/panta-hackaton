import {readFileSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {createPublicKey,verify} from 'node:crypto';
import {Connection,PublicKey,VersionedTransaction,TransactionMessage,TransactionInstruction,ComputeBudgetProgram,SystemProgram} from '@solana/web3.js';
import {BorshInstructionCoder,type Idl} from '@coral-xyz/anchor';
import {TOKEN_PROGRAM_ID,ASSOCIATED_TOKEN_PROGRAM_ID,getAssociatedTokenAddressSync,getMint,unpackAccount} from '@solana/spl-token';
import bs58 from 'bs58';
import {z} from 'zod';
import {address,baseUnits,type Build} from './contracts.js';
import {PantaError} from './client.js';

const rule=z.object({instruction:z.string(),accounts:z.record(z.string(),z.enum(['wallet','market','mint']).or(address)),args:z.record(z.string(),z.string()).default({}),sideValues:z.object({yes:z.string(),no:z.string()}).optional()});
const deploymentSchema=z.object({source:z.string().url(),chain:z.enum(['solana:mainnet','solana:devnet','solana:testnet']),genesisHash:address,programId:address,usdcMint:address,shareDecimals:z.number().int().min(0).max(18),idlFile:z.string(),rules:z.object({buy:rule,create:rule,claim:rule,fees:rule})});
export type Kind='buy'|'create'|'claim'|'fees';
export interface TransactionBinding {kind:Kind;wallet:string;market:string;amountBase:string;side?:string;quotedShares?:string;question?:string;resolutionRule?:string;startTime?:number;endTime?:number;resolutionTime?:number;maxSlippageBps?:number}
export class ChainService {
  readonly deployment: z.infer<typeof deploymentSchema>|null;
  private readonly idl:Idl|null;
  private readonly connection:Connection|null;
  constructor(){
    const file=process.env.PANTA_DEPLOYMENT_FILE;
    this.deployment=file?deploymentSchema.parse(JSON.parse(readFileSync(resolve(file),'utf8'))):null;
    this.idl=this.deployment&&file?JSON.parse(readFileSync(resolve(dirname(resolve(file)),this.deployment.idlFile),'utf8')) as Idl:null;
    if(this.idl&&this.idl.address!==this.deployment?.programId)throw Error('Deployment program and IDL address differ');
    const url=process.env.SOLANA_RPC_URL;
    if(url&&new URL(url).protocol!=='https:')throw Error('SOLANA_RPC_URL must use HTTPS');
    this.connection=url?new Connection(url,{commitment:'confirmed',disableRetryOnRateLimit:true,fetch:async(input,init)=>fetch(input,{...init,signal:AbortSignal.timeout(15000)})}):null;
  }
  configuration(){return {ready:!!(this.deployment&&this.connection),chain:this.deployment?.chain||null,reason:this.deployment&&this.connection?null:'Verified Panta deployment/IDL and SOLANA_RPC_URL are required before transaction approval.'}}
  async rpc(){if(!this.deployment||!this.connection)throw new PantaError('CONFIGURATION_REQUIRED',this.configuration().reason!);if(await this.connection.getGenesisHash()!==this.deployment.genesisHash)throw new PantaError('UNSUPPORTED_NETWORK','Configured RPC is not the verified Panta network.');return this.connection}
  async balances(wallet:string){const rpc=await this.rpc(),owner=new PublicKey(wallet),mint=new PublicKey(this.deployment!.usdcMint);const token=await getMint(rpc,mint);if(token.decimals!==6)throw new PantaError('INVALID_MINT','Configured mint does not have the documented six USDC decimals.');const [lamports,accounts]=await Promise.all([rpc.getBalance(owner),rpc.getTokenAccountsByOwner(owner,{mint})]);const total=accounts.value.reduce((sum,a)=>sum+unpackAccount(a.pubkey,a.account).amount,0n);return {wallet,lamports:String(lamports),usdcBase:total.toString(),decimals:6,chain:this.deployment!.chain}}
  compile(build:Build,wallet:string){return 'transaction' in build?VersionedTransaction.deserialize(Buffer.from(String(build.transaction),'base64')):new VersionedTransaction(new TransactionMessage({payerKey:new PublicKey(wallet),recentBlockhash:build.recentBlockhash,instructions:build.instructions.map(ix=>new TransactionInstruction({programId:new PublicKey(ix.programId),keys:ix.accounts.map(a=>({...a,pubkey:new PublicKey(a.pubkey)})),data:Buffer.from(ix.data,'base64')}))}).compileToV0Message())}
  async validate(build:Build,binding:TransactionBinding){
    const rpc=await this.rpc(),deployment=this.deployment!,tx=this.compile(build,binding.wallet);
    if(tx.message.header.numRequiredSignatures!==1||tx.message.staticAccountKeys[0]?.toBase58()!==binding.wallet)throw new PantaError('INVALID_TRANSACTION','Unexpected fee payer or additional required signer.');
    if(tx.message.recentBlockhash!==build.recentBlockhash)throw new PantaError('INVALID_TRANSACTION','Blockhash differs from the build response.');
    const tables=await Promise.all(tx.message.addressTableLookups.map(async lookup=>{const table=await rpc.getAddressLookupTable(lookup.accountKey);if(!table.value)throw new PantaError('INVALID_TRANSACTION','Address lookup table unavailable.');return table.value}));
    const message=TransactionMessage.decompile(tx.message,{addressLookupTableAccounts:tables});
    const coder=new BorshInstructionCoder(this.idl!),rule=deployment.rules[binding.kind];
    let seen=0;
    const expected:Record<string,string>={wallet:binding.wallet,market:binding.market,mint:deployment.usdcMint,amountBase:binding.amountBase,side:binding.side&&rule.sideValues?rule.sideValues[binding.side as 'yes'|'no']:binding.side||'',minimumSharesBase:binding.quotedShares?(baseUnits(binding.quotedShares,deployment.shareDecimals)*BigInt(10000-(binding.maxSlippageBps||0))/10000n).toString():'',question:binding.question||'',resolutionRule:binding.resolutionRule||'',startTime:String(binding.startTime??''),endTime:String(binding.endTime??''),resolutionTime:String(binding.resolutionTime??''),maxSlippageBps:String(binding.maxSlippageBps??'')};
    // The reviewed policy must bind the wallet and market, plus spending amount.
    if(!Object.values(rule.accounts).includes('wallet')||!Object.values(rule.accounts).includes('market')||(['buy','create'].includes(binding.kind)&&!Object.values(rule.args).includes('amountBase'))||binding.kind==='buy'&&!Object.values(rule.args).includes('side'))throw new PantaError('INVALID_POLICY','Transaction policy is missing required wallet/market/amount/outcome bindings.');
    if(binding.kind==='buy'&&!Object.values(rule.args).includes('minimumSharesBase'))throw new PantaError('INVALID_POLICY','Purchase policy must bind the minimum shares to the reviewed slippage limit.');
    if(binding.kind==='create'&&['question','resolutionRule','startTime','endTime','resolutionTime'].some(k=>!Object.values(rule.args).includes(k)))throw new PantaError('INVALID_POLICY','Creation policy must validate all on-chain market criteria.');
    for(const ix of message.instructions){
      if(ix.programId.toBase58()===deployment.programId){
        const decoded=coder.decode(ix.data);if(!decoded||decoded.name!==rule.instruction||++seen!==1)throw new PantaError('INVALID_TRANSACTION','Unexpected Panta instruction.');
        const definition=this.idl!.instructions.find(i=>i.name===decoded.name)!;
        const names:string[]=[];const flatten=(accounts:typeof definition.accounts)=>{for(const account of accounts){if('accounts' in account)flatten(account.accounts);else names.push(account.name)}};flatten(definition.accounts);
        for(const [name,value] of Object.entries(rule.accounts)){const key=ix.keys[names.indexOf(name)]?.pubkey.toBase58();if(key!==(expected[value]||value))throw new PantaError('INVALID_TRANSACTION','Transaction account does not match reviewed intent.');}
        for(const [name,value] of Object.entries(rule.args)){const actual=(decoded.data as Record<string,unknown>)[name];const text=typeof actual==='object'&&actual!==null&&Object.keys(actual).length===1&&!('toNumber' in actual)?Object.keys(actual)[0]:String(actual);if(text!==(expected[value]??value))throw new PantaError('INVALID_TRANSACTION','Transaction arguments do not match reviewed intent.');}
      }else if(ix.programId.equals(ASSOCIATED_TOKEN_PROGRAM_ID)){
        const keys=ix.keys.map(k=>k.pubkey.toBase58());const owner=new PublicKey(binding.wallet),mint=new PublicKey(deployment.usdcMint);
        if(![0,1].includes(ix.data.length===0?0:ix.data.length===1?ix.data[0]!:255)||keys[0]!==binding.wallet||keys[1]!==getAssociatedTokenAddressSync(mint,owner).toBase58()||keys[2]!==binding.wallet||keys[3]!==deployment.usdcMint||keys[4]!==SystemProgram.programId.toBase58()||keys[5]!==TOKEN_PROGRAM_ID.toBase58())throw new PantaError('INVALID_TRANSACTION','Unapproved associated-token-account instruction.');
      }else if(ix.programId.equals(ComputeBudgetProgram.programId)){
        if(ix.keys.length||!((ix.data.length===5&&ix.data[0]===2&&ix.data.readUInt32LE(1)<=1400000)||(ix.data.length===9&&ix.data[0]===3&&ix.data.readBigUInt64LE(1)<=1000000n)))throw new PantaError('INVALID_TRANSACTION','Unsupported compute budget or excessive priority fee.');
      }else throw new PantaError('INVALID_TRANSACTION','Transaction contains a program not approved by the verified policy.');
    }
    if(seen!==1)throw new PantaError('INVALID_TRANSACTION','Expected Panta instruction missing.');
    if(!(await rpc.isBlockhashValid(build.recentBlockhash)).value)throw new PantaError('EXPIRED','Transaction blockhash expired.');
    const balances=await this.balances(binding.wallet);if(BigInt(balances.usdcBase)<BigInt(binding.amountBase))throw new PantaError('INSUFFICIENT_COLLATERAL','Insufficient USDC collateral.');
    const fee=(await rpc.getFeeForMessage(tx.message)).value;if(fee===null||BigInt(balances.lamports)<BigInt(fee))throw new PantaError('INSUFFICIENT_NETWORK_FEE','Insufficient SOL for the network fee.');
    const simulation=await rpc.simulateTransaction(tx,{sigVerify:false,commitment:'confirmed'});if(simulation.value.err)throw new PantaError('SIMULATION_FAILED','Transaction simulation failed; check balances and current eligibility.');
    return {transaction:Buffer.from(tx.serialize()).toString('base64'),message:Buffer.from(tx.message.serialize()).toString('base64'),feeLamports:String(fee),chain:deployment.chain,validatedAt:new Date().toISOString()};
  }
  signed(raw:string,message:string,wallet:string){const tx=VersionedTransaction.deserialize(Buffer.from(raw,'base64'));if(Buffer.from(tx.message.serialize()).toString('base64')!==message||tx.signatures.length!==1)throw new PantaError('INVALID_TRANSACTION','Wallet changed the reviewed transaction.');const key=createPublicKey({key:Buffer.concat([Buffer.from('302a300506032b6570032100','hex'),new PublicKey(wallet).toBuffer()]),type:'spki',format:'der'});if(!verify(null,tx.message.serialize(),key,tx.signatures[0]!))throw new PantaError('INVALID_SIGNATURE','Wallet signature is invalid.');return bs58.encode(tx.signatures[0]!)}
  async broadcast(raw:string){return (await this.rpc()).sendRawTransaction(Buffer.from(raw,'base64'),{skipPreflight:false,preflightCommitment:'confirmed',maxRetries:0})}
  async status(signature:string,_blockhash:string){const rpc=await this.rpc();const status=(await rpc.getSignatureStatuses([signature],{searchTransactionHistory:true})).value[0];if(status?.err)return 'failed';if(status?.confirmationStatus==='confirmed'||status?.confirmationStatus==='finalized')return 'confirmed';if(status)return 'pending';return 'confirmation_unknown'}
}
export {baseUnits};
