import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import React, { useState } from 'react'
import { BigNumber, utils } from 'ethers'

import Button from '../../Button/Button'
import IconLoader from '../../IconLoader'
import DesktopWalletInfo from './modal/WalletInfo/DesktopWalletInfo'

import config from '../../../config'
import { truncateMiddle } from '../../../utils'
import { BackgroundAbsolute } from '../../Selector'

interface AccountButtonProps {
  showWarning: boolean
}

const AccountButton: React.FC<AccountButtonProps> = ({
  showWarning = false,
}: AccountButtonProps) => {
  // @ts-ignore
  const { ethereum }: { ethereum: any } = window

  const [showWalletInfo, setShowWalletInfo] = useState<boolean>(false)

  const { account, connect, balance, status } = useWallet()

  const wallet = useWallet()

  // console.log('wallet', wallet)
  // console.log('useWallet', account, balance, status)

  const switchMetamaskChain = () => {
    if (ethereum) {
      ethereum
        .request({
          method: 'wallet_switchEthereumChain',
          params: [
            {
              chainId: utils.hexStripZeros(
                BigNumber.from(config.chainId).toHexString(),
              ),
            },
          ],
        })
        .then(() => {
          window.location.reload()
        })
        .catch((error: any) => {
          if (error.code === 4902) addNetworkToMetamask()
        })
    }
  }

  const addNetworkToMetamask = () => {
    if (ethereum) {
      ethereum
        .request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: utils.hexStripZeros(
                BigNumber.from(config.chainId).toHexString(),
              ),
              chainName: config.networkName,
              rpcUrls: [],
              iconUrls: [],
              blockExplorerUrls: [config.etherscanUrl],
              nativeCurrency: {
                name: config.blockchainTokenName,
                symbol: config.blockchainToken,
                decimals: config.blockchainTokenDecimals,
              },
            },
          ],
        })
        .then(() => {
          window.location.reload()
        })
        .catch((error: any) => {
          if (error.code === 4001) {
            console.log('We cannot encrypt anything without the key.')
          }
        })
    }
  }

  return (
    <div>
      {showWalletInfo && (
        <BackgroundAbsolute onClick={() => setShowWalletInfo(false)} />
      )}
      <StyledAccountButton>
        {showWarning ? (
          <Button onClick={switchMetamaskChain} text="Switch network" />
        ) : !account ? (
          <Button
            text="Connect Wallet"
            tracking_id={'connect_wallet'}
            onClick={() => {
              console.log('clicked')
              connect('injected')
                .then(() => {
                  localStorage.removeItem('disconnectWallet')
                  console.log('injected')
                })
                .catch((e) => {
                  console.log('error', e)
                })
            }}
          />
        ) : (
          <Button
            onClick={() => setShowWalletInfo(!showWalletInfo)}
            variant={'transparent'}
            text={truncateMiddle(account, 12, '...')}
            tracking_id={'disconnect_wallet'}
          >
            <IconLoader
              iconName={'Wallet'}
              width={24}
              height={24}
              className="marginR8"
            />
          </Button>
        )}
      </StyledAccountButton>
      <DesktopWalletInfo
        modalOpen={showWalletInfo}
        onClose={() => {
          setShowWalletInfo(false)
        }}
      />
    </div>
  )
}

const StyledAccountButton = styled.div``

export default AccountButton
