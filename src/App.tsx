import { Provider } from 'react-redux'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { UseWalletProvider } from 'use-wallet'
import { SnackbarProvider } from 'notistack'
import { useMediaQuery } from 'react-responsive'
import { HashRouter as Router } from 'react-router-dom'
import FormControl from '@material-ui/core/FormControl'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import store from './state'
import Updaters from './state/Updaters'
import ProtocolProvider from './context/Provider'
import ModalsProvider from './context/Modals'
import Navbar from './components/Navbar'
import config from './config'
import Home from './views/Home'
import NoMetamaskNotice from './components/NoMetamaskNotice'
import Popups from './components/Popups'
import useCore from './hooks/useCore'

const Providers: React.FC = ({ children }) => {
  return (
    <UseWalletProvider
      connectors={{ injected: {} }}
      // connectors={{ injected: { chainId: [4] } }}
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
        <div>
          <Home />
        </div>
      </Router>
    </Providers>
  )
}

export default App

// if (isProduction) console.log = function () { };
