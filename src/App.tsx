import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { UseWalletProvider } from 'use-wallet'
import { useMediaQuery } from 'react-responsive'
import { HashRouter as Router } from 'react-router-dom'
import FormControl from '@material-ui/core/FormControl'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import Navbar from './components/Navbar'
import config from './config'
import Home from './views/Home'
import NoMetamaskNotice from './components/NoMetamaskNotice'
import useCore from './hooks/useCore'
import TextWrapper from './components/TextWrapper'
import HeadingBgDesign from './assets/images/HeadingBgDesign.png'
import SelectOption from './components/SelectOptiion'
import UploadIcon from './assets/icons/misc/UploadIcon.svg'
import Button from './components/Button'
import Prepare from './views/Home/1Prepare'
import Approve from './views/Home/2Approve'
import Confirm from './views/Home/3Confirm'
import Send from './views/Home/4Send'

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
        <div>
          <Home />
        </div>
      </Router>
    </Providers>
  )
}

export default App

// if (isProduction) console.log = function () { };
