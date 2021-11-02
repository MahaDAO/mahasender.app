import React, { useEffect } from 'react'
import { UseWalletProvider } from 'use-wallet'
import { useMediaQuery } from 'react-responsive'
import { HashRouter as Router } from 'react-router-dom'

import Navbar from './components/Navbar'
import config from './config'
import Home from './views/Home'
import NoMetamaskNotice from './components/NoMetamaskNotice'
import useCore from './hooks/useCore'

const Providers: React.FC = ({ children }) => {
  return (
    <UseWalletProvider
      // chainId={config.chainId}
      // connectors={{ injected: {} }}
      connectors={{ injected: { chainId: [97] } }}
    >
      {children}
    </UseWalletProvider>
  )
}

export let isMobileGlobal = false

const App: React.FC = () => {
  const core = useCore()
  const isMobile = useMediaQuery({ maxWidth: '600px' })
  isMobileGlobal = isMobile

  useEffect(() => {
    // @ts-ignore
    if (window.ethereum)
      // @ts-ignore
      window.ethereum.on('chainChanged', (chainId) => {
        window.location.reload()
      })
  }, [])

  if (!window.ethereum) return <NoMetamaskNotice />
  if (!core) return <div />

  return (
    <Providers>
      <Router>
        <Navbar />
        <div className={'container'}>
          <Home />
        </div>
      </Router>
    </Providers>
  )
}

export default App

// if (isProduction) console.log = function () { };
