import {createContext,useContext} from 'react'
export const CommunityContext=createContext(null)
export const useCommunity=()=>useContext(CommunityContext)
