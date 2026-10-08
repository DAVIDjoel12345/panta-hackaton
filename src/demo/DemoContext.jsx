import { useState } from 'react'
import { DemoContext } from './useDemo.js'
import { initialComments, initialNotifications, initialDraft } from './fixtures.js'
import { navigate } from '../app/navigation.js'

export function DemoProvider({ children }) {
  const [wallet, setWallet] = useState(false)
  const [accountEpoch,setAccountEpoch]=useState(0)
  const [authenticated, setAuthenticated] = useState(false)
  const [sessionAccessStatus,setSessionAccessStatus]=useState('guest')
  const [role, setRole] = useState('member')
  const [saved, setSaved] = useState(['demo-btc', 'demo-ai'])
  const [savedRooms, setSavedRooms] = useState(['technology'])
  const [savedAnalyses, setSavedAnalyses] = useState([])
  const [joined, setJoined] = useState([])
  const [following, setFollowing] = useState([])
  const [comments, setComments] = useState(initialComments)
  const [notifications, setNotifications] = useState(initialNotifications)
  const [drafts, setDrafts] = useState([initialDraft])
  const [claims, setClaims] = useState({})
  const [demoTransactions, setDemoTransactions] = useState([])
  const [customMarkets, setCustomMarkets] = useState([])
  const [customRooms, setCustomRooms] = useState([])
  const [creatorClaim, setCreatorClaim] = useState('')
  const [moderationActions, setModerationActions] = useState([])
  const [roomDetails, setRoomDetails] = useState({})
  const [roomRoles, setRoomRoles] = useState({})
  const [conversations, setConversations] = useState({ 'demo-conversation-1': ['Explain the market resolution criteria.'] })
  const [settings, setSettings] = useState({ name: 'Alex Morgan', bio: 'Curious about what comes next.', email: '', digest: true, marketAlerts: true, profileVisible: true, theme: 'dark', compact: false })
  const [toast, setToast] = useState('')
  const [safeDrafts,setSafeDrafts] = useState({})
  const requireAuth = () => {if(authenticated&&sessionAccessStatus==='authenticated')return true;navigate('/auth?returnTo='+encodeURIComponent(location.pathname+location.search));return false}
  const toggle = setter => id => {if(requireAuth())setter(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id])}
  const resetAccount = () => {setAccountEpoch(value=>value+1);setAuthenticated(false);setRole('member');setSaved([]);setSavedRooms([]);setSavedAnalyses([]);setJoined([]);setFollowing([]);setComments(initialComments);setNotifications(initialNotifications);setDrafts([]);setClaims({});setDemoTransactions([]);setCustomMarkets([]);setCustomRooms([]);setCreatorClaim('');setModerationActions([]);setRoomDetails({});setRoomRoles({});setConversations({});setSafeDrafts({});setSettings({name:'Demo participant',bio:'',email:'',digest:false,marketAlerts:false,profileVisible:true,theme:'dark',compact:false})}
  return <DemoContext.Provider value={{ accountEpoch, sessionAccessStatus, setSessionAccessStatus, resetAccount, requireAuth, safeDrafts, setSafeDrafts, wallet, setWallet, authenticated, setAuthenticated, role, setRole, saved, toggleSave: toggle(setSaved), savedRooms, toggleRoomSave: toggle(setSavedRooms), savedAnalyses, toggleAnalysisSave: toggle(setSavedAnalyses), joined, toggleJoin: toggle(setJoined), following, toggleFollow: toggle(setFollowing), comments, setComments, notifications, setNotifications, drafts, setDrafts, claims, setClaims, demoTransactions, setDemoTransactions, customMarkets, setCustomMarkets, customRooms, setCustomRooms, settings, setSettings, toast, notify: setToast, creatorClaim, setCreatorClaim, moderationActions, setModerationActions, roomDetails, setRoomDetails, roomRoles, setRoomRoles, conversations, setConversations }}>{children}</DemoContext.Provider>
}
