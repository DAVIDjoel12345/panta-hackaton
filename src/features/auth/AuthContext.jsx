import { useCallback, useState } from 'react'
import { AuthContext as Context } from './useAuth.js'
import { useDemo } from '../../demo/useDemo.js'
import { navigate } from '../../app/navigation.js'
import { safeReturnPath } from './config.js'
import { demoAuthAdapter } from '../../mocks/authAdapter.js'
export function AuthProvider({children}) {
  const demo = useDemo()
  const [status,setStatusState] = useState('guest')
  const setStatus = value => {setStatusState(value);demo.setSessionAccessStatus(value);if(value==='expired')demo.setAuthenticated(false)}
  const [session,setSession] = useState(null)
  const [account,setAccountState] = useState('DEMO-ALEX')
  const [verifiedWallets,setVerifiedWallets] = useState([])
  const [associatedWallets,setAssociatedWallets] = useState([])
  const [emailVerified,setEmailVerified] = useState(false)
  const [flow,setFlow] = useState({email:'',name:'',purpose:'login',method:'code',pending:false,cooldown:false})
  const [returnTo,setReturnState] = useState('/markets')
  const [onboarding,setOnboarding] = useState({step:'welcome',complete:false,name:'',username:'',avatar:'AM',interests:[],destination:'/markets'})
  const [sessions,setSessions] = useState([])
  const [callback,setCallback] = useState(false)
  const setReturnTo = useCallback(path => setReturnState(safeReturnPath(path)), [])
  const setAccount = value => { setAccountState(value); demo.setWallet(true) }
  function succeed(method, isNew = false) {
    demo.notify('')
    const next=demoAuthAdapter.session(method);setSession(next);setStatus('authenticated');demo.setAuthenticated(true)
    setSessions([{id:next.id,label:'This browser · fictional session',current:true},{id:'fictional-session-other',label:'Example second device · fictional',current:false}])
    if(method==='wallet'){setVerifiedWallets(current=>[...new Set([...current,account])]);if(!session)setAssociatedWallets([account])}
    else {setVerifiedWallets([]);setAssociatedWallets([])}
    if(method==='password'||method==='code')setEmailVerified(true)
    if(isNew&&!onboarding.complete){setOnboarding(current=>({...current,destination:returnTo}));navigate('/onboarding')}
    else navigate(safeReturnPath(returnTo))
  }
  function logout() {
    setAssociatedWallets([])
    setStatus('guest');setSession(null);setSessions([]);setVerifiedWallets([]);setEmailVerified(false);setCallback(false);setFlow({email:'',name:'',purpose:'login',method:'code',pending:false,cooldown:false});setReturnTo('/markets')
    setOnboarding(current=>({step:current.complete?'complete':'welcome',complete:current.complete,name:'',username:'',avatar:'AM',interests:[],destination:'/markets'}))
    demo.resetAccount();demo.notify('Signed out. Local account data cleared. Wallet connection is separate.');navigate('/auth?loggedOut=1')
  }
  function requireWallet(path = window.location.pathname + window.location.search) {
    if(demo.wallet&&verifiedWallets.includes(account)&&demo.authenticated&&status==='authenticated')return true
    setReturnTo(path);window.__pantaDirty=false;navigate('/auth/wallet?returnTo='+encodeURIComponent(safeReturnPath(path)));return false
  }
  return <Context.Provider value={{status,setStatus,session,account,setAccount,verifiedWallets,setVerifiedWallets,associatedWallets,setAssociatedWallets,emailVerified,setEmailVerified,flow,setFlow,returnTo,setReturnTo,onboarding,setOnboarding,sessions,setSessions,callback,setCallback,succeed,logout,requireWallet}}>{children}</Context.Provider>
}
