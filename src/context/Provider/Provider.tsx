import { useWallet } from 'use-wallet'
import React, { createContext, useEffect, useState } from 'react'

import Protocol from '../../protocol'
import defaultConfig, { getConfig } from '../../config'
import { ProtocolContext } from '../../utils/interface'

export const Context = createContext<ProtocolContext>({
  core: new Protocol(defaultConfig),
})

export const ProtocolProvider: React.FC = ({ children }) => {
  const [core, setCore] = useState<Protocol>(new Protocol(defaultConfig))

  const { ethereum, account, chainId } = useWallet()

  useEffect(() => {
    const config = getConfig(chainId || 1)
    if (!config) return setCore(new Protocol(defaultConfig))
    setCore(new Protocol(config))
  }, [chainId])

  useEffect(() => {
    if (account) {
      core.unlockWallet(ethereum, account)
    }
  }, [account, core, ethereum])

  return <Context.Provider value={{ core }}>{children}</Context.Provider>
}
