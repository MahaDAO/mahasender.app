import { useState } from 'react'
import { UseWalletProvider } from 'use-wallet'

import Navbar from './components/Navbar'
import config from './config'
import Home from './views/Home'

function App() {
  return (
    <UseWalletProvider
      // chainId={config.chainId}
      connectors={{ injected: {} }}
    >
      <Navbar />
      <div className={'container'}>
        <Home />
      </div>
    </UseWalletProvider>
  )
}

export default App
