import { Provider } from 'react-redux'
import React, { useEffect } from 'react'
import { UseWalletProvider } from 'use-wallet'
import { SnackbarProvider } from 'notistack'
import { useMediaQuery } from 'react-responsive'
import { HashRouter as Router } from 'react-router-dom'

import store from './state'
import Updaters from './state/Updaters'
import ProtocolProvider from './context/Provider'
import ModalsProvider from './context/Modals'
import TopBar from './components/TopBar'
import Home from './views/Home'
import NoMetamaskNotice from './components/NoMetamaskNotice'
import Popups from './components/Popups'
import useCore from './hooks/useCore'
import { getSupportedChains } from './config'

const Providers: React.FC = ({ children }) => {
  const core = useCore()
  const supportedChains = getSupportedChains()

  return (
    <UseWalletProvider
      connectors={{
        injected: {
          chainId: supportedChains,
        },
        walletconnect: {
          chainId: supportedChains,
          rpcUrl: core.config.defaultProvider,
        },
      }}
    >
      <Provider store={store}>
        <Updaters />
        <ProtocolProvider>
          <ModalsProvider>
            <SnackbarProvider
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              maxSnack={2}
            >
              <Popups />
              {children}
            </SnackbarProvider>
          </ModalsProvider>
        </ProtocolProvider>
      </Provider>
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
    if (window.ethereum) {
      // @ts-ignore
      window.ethereum.on('chainChanged', (chainId) => {
        // window.location.reload()
      })
    }
  }, [])

  if (!core) return <div />

  return (
    <Providers>
      <Router>
        <TopBar />
        <div>
          <Home />
        </div>
      </Router>
    </Providers>
  )
}

export default App

// if (isProduction) console.log = function () { };
