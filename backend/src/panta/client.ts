import {HttpException} from '@nestjs/common';
import {randomUUID} from 'node:crypto';
import {setTimeout as delay} from 'node:timers/promises';
import {z} from 'zod';
import * as c from './contracts.js';

export class PantaError extends HttpException {
  constructor(code:string,message:string,status=503,requestId=randomUUID(),retryAfter?:number){super({code,message,requestId,...(retryAfter?{retryAfter}:{})},status)}
}
export function pantaEnvironment(){
  const base=process.env.PANTA_API_BASE_URL||'https://live-api.panta.market/api/v1';
  if(!['https://live-api.panta.market/api/v1','https://staging-api.panta.market/api/v1'].includes(base))throw Error('PANTA_API_BASE_URL must be an official production or staging URL');
  return {base,key:process.env.PANTA_API_KEY||''};
}
export class PantaClient {
  readonly cache=new Map<string,{at:number,data:unknown}>();
  readonly pending=new Map<string,Promise<unknown>>();
  private blockedUntil=0;
  constructor(private readonly bearer?:string){pantaEnvironment()}
  private async request<T>(path:string,schema:z.ZodType<T>,body?:unknown,method='GET',signal?:AbortSignal,publicAuth=false):Promise<T>{
    const {base,key}=pantaEnvironment();const requestId=randomUUID();
    if(!key&&!this.bearer&&!publicAuth)throw new PantaError('CONFIGURATION_REQUIRED','Configure server-side PANTA_API_KEY.',503,requestId);
    if(this.blockedUntil>Date.now())throw new PantaError('RATE_LIMITED','Panta rate limit reached. Retry after the indicated delay.',429,requestId,Math.ceil((this.blockedUntil-Date.now())/1000));
    const cacheKey=base+path;const cached=this.cache.get(cacheKey);
    if(method==='GET'&&cached&&Date.now()-cached.at<1000)return cached.data as T;
    if(method==='GET'&&!signal&&this.pending.has(cacheKey))return this.pending.get(cacheKey) as Promise<T>;
    const run=async()=>{
      for(let attempt=0;attempt<(method==='GET'?2:1);attempt++){
        try{
          const response=await fetch(base+path,{method,redirect:'error',headers:{...(!publicAuth?(this.bearer?{Authorization:'Bearer '+this.bearer}:{'X-Api-Key':key}):{}),'X-Request-Id':requestId,...(body!==undefined?{'Content-Type':'application/json'}:{})},...(body!==undefined?{body:JSON.stringify(body)}:{}),signal:signal?AbortSignal.any([signal,AbortSignal.timeout(12000)]):AbortSignal.timeout(12000)});
          const data:unknown=await response.json();
          if(!response.ok){
            const error=z.object({code:z.string().optional(),message:z.string().optional()}).safeParse(data);
            const code=error.success?error.data.code||'PROVIDER_ERROR':'PROVIDER_ERROR';
            const seconds=Math.max(1,Math.min(300,Number(response.headers.get('Retry-After'))||30));
            if(response.status===429)this.blockedUntil=Date.now()+seconds*1000;
            // Never echo arbitrary upstream text: it can contain credentials or signed payloads.
            const message=({CREATE_NOT_PERMITTED:'Panta has disabled market creation for this API account.',QUOTE_EXPIRED:'Quote expired. Review a new quote.',QUOTE_STALE:'The market moved beyond your slippage limit.',NOT_CLAIMABLE:'This wallet is not eligible to claim.',NOT_MARKET_CREATOR:'This wallet is not the market creator.',MARKET_NOT_GRADUATED:'Creator fees are unavailable before graduation.',NO_CREATOR_FEES:'No creator fees are currently claimable.',MARKET_NOT_IN_PRIMARY:'This market does not accept primary buys.',TX_NOT_FOUND:'Transaction has not been observed at the required confirmation level.',RATE_LIMITED:'Panta rate limit reached. Wait before retrying.',UNAUTHORIZED:'Panta credentials or wallet binding were rejected.',INVALID_MARKET_PARAMS:'Panta rejected the supplied market parameters.'} as Record<string,string>)[code]||`Panta request failed (${response.status}).`;
            if(response.status>=500&&method==='GET'&&attempt===0){await delay(300,undefined,signal?{signal}:{});continue}
            throw new PantaError(code,message,response.status===401?503:response.status,requestId,response.status===429?seconds:undefined);
          }
          const parsed=schema.safeParse(data);if(!parsed.success)throw new PantaError('INVALID_PROVIDER_RESPONSE','Panta returned an unsupported response schema.',502,requestId);
          const refreshIntervalMs=/^\/markets\/[^/]+\/$/.test(path)?2000:/^\/markets\/[^/]+\/trades\//.test(path)?5000:10000;
          const result=Object.assign(parsed.data as object,{retrievedAt:new Date().toISOString(),source:'Panta',refreshIntervalMs}) as T;
          if(method==='GET'){if(this.cache.size>=200)this.cache.delete(this.cache.keys().next().value!);this.cache.set(cacheKey,{at:Date.now(),data:result})}
          return result;
        }catch(error){if(error instanceof PantaError)throw error;if(signal?.aborted)throw error;if(method==='GET'&&attempt===0){await delay(300);continue}throw new PantaError('PROVIDER_TIMEOUT','Could not complete the Panta request. Check its status before repeating a transaction operation.',503,requestId)}
      }
      throw new PantaError('PROVIDER_UNAVAILABLE','Panta is unavailable.',503,requestId);
    };
    const result=run();if(method==='GET'&&!signal)this.pending.set(cacheKey,result);
    try{return await result}finally{if(method==='GET'&&!signal)this.pending.delete(cacheKey)}
  }
  markets(query:unknown={}){const q=c.listQuery.parse(query);return this.request('/markets/?'+new URLSearchParams(Object.entries(q).map(([k,v])=>[k,String(v)])),z.object({items:z.array(c.market),nextCursor:z.string().nullish()}))}
  market(id:string){return this.request('/markets/'+c.address.parse(id)+'/',c.market)}
  categories(){return this.request('/categories/',z.object({categories:z.array(z.string())}))}
  marketTrades(id:string){return this.request('/markets/'+c.address.parse(id)+'/trades/?limit=50',z.object({marketId:c.address,items:z.array(c.trade)}))}
  walletTrades(wallet:string){return this.request('/wallets/'+c.address.parse(wallet)+'/trades/?limit=50',z.object({wallet:c.address,items:z.array(c.trade)}))}
  positions(wallet:string){return this.request('/positions/?wallet='+c.address.parse(wallet),z.object({wallet:c.address,positions:z.array(c.position)}))}
  account(){return this.request('/account/',c.account)}
  // Operator bootstrap only. These are deliberately not Signal-user routes.
  providerLogin(input:unknown,register=false){const body=z.object({email:z.email(),password:z.string().min(8).max(128),name:z.string().max(255).optional()}).strict().parse(input);return this.request(register?'/auth/register/':'/auth/token/',z.object({userId:z.string().nullable(),email:z.string(),name:z.string(),access:z.string(),refresh:z.string()}),body,'POST',undefined,true)}
  providerRefresh(refresh:string){return this.request('/auth/token/refresh/',z.object({access:z.string(),refresh:z.string()}),{refresh:z.string().min(1).parse(refresh)},'POST',undefined,true)}
  dashboard(){return this.request('/account/dashboard/',z.object({account:c.account,keys:z.record(z.string(),z.unknown()),metrics:z.record(z.string(),z.unknown()),permissions:z.object({canCreateMarkets:z.boolean()})}))}
  metrics(){return this.request('/account/metrics/?limit=50',z.object({summary:z.record(z.string(),z.unknown()),creates:z.array(z.record(z.string(),z.unknown())),trades:z.array(z.record(z.string(),z.unknown()))}))}
  creates(){return this.request('/account/creates/?limit=200',z.object({summary:z.record(z.string(),z.unknown()),items:z.array(z.object({createId:z.string(),wallet:c.address,eventPda:z.string(),status:z.string()}).passthrough())}))}
  accountTrades(){return this.request('/account/trades/?limit=200',z.object({summary:z.record(z.string(),z.unknown()),items:z.array(z.record(z.string(),z.unknown()))}))}
  updateAccount(name:string){return this.request('/account/',c.account,{name:z.string().min(1).max(255).parse(name)},'PATCH')}
  keys(){return this.request('/account/keys/',z.object({keys:z.array(z.object({id:z.string(),prefix:z.string(),status:z.string()}).passthrough())}))}
  createKey(env:'test'|'live',name:string){return this.request('/account/keys/',z.object({id:z.string(),secret:z.string(),prefix:z.string(),env:z.string(),status:z.string()}).passthrough(),{env:z.enum(['test','live']).parse(env),name:z.string().max(128).parse(name),revokeOthers:false},'POST')}
  revokeKey(id:string){return this.request('/account/keys/'+z.string().regex(/^[\w-]+$/).parse(id)+'/revoke/',z.object({id:z.string(),status:z.string()}).passthrough(),{},'POST')}
  upload(){return this.request('/markets/create/image-upload/',z.object({uploadUrl:z.string().url().refine(v=>new URL(v).hostname==='api.cloudinary.com'),publicId:z.string(),expiresAt:z.string(),fields:z.record(z.string(),z.union([z.string(),z.number(),z.boolean()]))}),{},'POST')}
  createQuote(input:c.CreateInput){return this.request('/markets/create/quote/',c.createQuote,c.createInput.parse(input),'POST')}
  createBuild(createId:string,wallet:string){return this.request('/markets/create/build/',c.createBuild,{createId,wallet},'POST')}
  register(createId:string,signature:string){return this.request('/markets/register/',z.object({marketId:c.address,status:z.literal('registered'),signature:c.signature}).passthrough(),{createId,signature:c.signature.parse(signature)},'POST')}
  buyQuote(input:c.BuyInput,userId:string){const {maxSlippageBps:_,...body}=c.buyInput.parse(input);return this.request('/primaryorderquote/',c.buyQuote,{...body,userId},'POST')}
  buyBuild(quoteId:string,wallet:string,maxSlippageBps:number,userId:string){return this.request('/primaryorderbuild/',c.buyBuild,{quoteId,wallet,maxSlippageBps,userId},'POST')}
  submit(orderId:string,signature:string,wallet:string){return this.request('/primaryordersubmit/',z.object({orderId:z.string(),status:z.string(),signature:c.signature}),{orderId,signature,wallet},'POST')}
  verify(orderId:string,signature:string,wallet:string){return this.request('/primaryorderverify/',z.object({orderId:z.string(),status:z.enum(['built','submitted','confirmed','failed','expired'])}).passthrough(),{orderId,signature,wallet},'POST')}
  claim(wallet:string,marketId:string){return this.request('/claim/build/',c.claimBuild,{wallet:c.address.parse(wallet),marketId:c.address.parse(marketId)},'POST')}
  creatorFees(wallet:string,marketId:string){return this.request('/claim/creator-fees/build/',c.feesBuild,{wallet:c.address.parse(wallet),marketId:c.address.parse(marketId)},'POST')}
  report(body:{signature:string,wallet:string,marketId:string,userId:string,quoteId?:string,clientOrderId:string}){return this.request('/trades/',z.object({signature:c.signature,status:z.string(),kind:z.enum(['buy','claim']).optional()}).passthrough(),body,'POST')}
  tradeStatus(signature:string,userId:string){return this.request('/trades/'+c.signature.parse(signature)+'/?'+new URLSearchParams({userId}),z.object({signature:c.signature,status:z.enum(['processed','pending_attribution','unknown','failed'])}).passthrough())}
}
