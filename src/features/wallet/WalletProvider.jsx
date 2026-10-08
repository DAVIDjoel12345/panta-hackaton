import {useEffect,useRef,useState} from 'react'
import {getWallets} from '@wallet-standard/app'
import {WalletContext} from '../../hooks/useWallet.js'
import useLiveQuery from '../../hooks/useLiveQuery.js'
export default function WalletProvider({children}){
 const registry=getWallets(),[wallets,setWallets]=useState(()=>registry.get()),[selected,setSelected]=useState(null),[account,setAccount]=useState(null),[error,setError]=useState(''),[busy,setBusy]=useState(false)
 const current=useRef(null),version=useRef(0)
 const configuration=useLiveQuery('/panta/config',60000),config=configuration.data
 useEffect(()=>{const update=()=>setWallets(registry.get());const off=[registry.on('register',update),registry.on('unregister',update)];return()=>off.forEach(f=>f())},[registry])
 useEffect(()=>{if(!selected)return;return selected.features['standard:events']?.on('change',change=>{if(change.accounts){version.current++;current.current=change.accounts[0]||null;setAccount(current.current)}})},[selected])
 async function connect(wallet){if(busy)return;setBusy(true);setError('');try{const result=await wallet.features['standard:connect'].connect();current.current=result.accounts[0]||null;version.current++;setSelected(wallet);setAccount(current.current)}catch(e){setError(e.message||'Wallet connection rejected.')}finally{setBusy(false)}}
 async function disconnect(){version.current++;current.current=null;setAccount(null);const wallet=selected;setSelected(null);try{await wallet?.features['standard:disconnect']?.disconnect()}catch{setError('Wallet disconnected from this application.')}}
 async function sign(transaction,chain){const chosen=current.current,epoch=version.current;if(!chosen||!selected)throw Error('Connect a wallet first.');if(!chosen.chains.includes(chain))throw Error('Selected wallet account does not support the required network.');const feature=selected.features['solana:signTransaction'];if(!feature||!chosen.features.includes('solana:signTransaction'))throw Error('This wallet cannot sign Solana transactions.');const [result]=await feature.signTransaction({account:chosen,chain,transaction});if(epoch!==version.current||current.current?.address!==chosen.address)throw Error('Wallet account changed. The transaction was not submitted.');if(!result?.signedTransaction)throw Error('Wallet did not return a signed transaction.');return result.signedTransaction}
 return <WalletContext.Provider value={{wallets:wallets.filter(w=>w.features['standard:connect']&&w.features['solana:signTransaction']),account,address:account?.address||'',selected,busy,error,connect,disconnect,sign,config,configurationError:configuration.error,refreshConfig:configuration.refresh}}>{children}</WalletContext.Provider>
}
