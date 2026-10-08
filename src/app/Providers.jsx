import LiveProviders from './LiveProviders.jsx'
import WalletProvider from '../features/wallet/WalletProvider.jsx'
export default function Providers({children}){return <LiveProviders><WalletProvider>{children}</WalletProvider></LiveProviders>}
