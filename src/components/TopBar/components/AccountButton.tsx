import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import React, { useState, useEffect } from 'react'

import Button from '../../Button/Button'
import IconLoader from '../../IconLoader'
import { BackgroundAbsolute } from '../../Selector'
import ChooseWallet from './modal/WalletInfo/ChooseWallet'
import DesktopWalletInfo from './modal/WalletInfo/DesktopWalletInfo'

import { truncateMiddle } from '../../../utils'

const AccountButton: React.FC = () => {
  const [showWalletInfo, setShowWalletInfo] = useState<boolean>(false)
  const [showWalletOption, setShowWalletOption] = useState<boolean>(false)

  const { account, error } = useWallet()

  useEffect(() => {
    if (error) setShowWalletInfo(false)
  }, [error])

  return (
    <div>
      <ChooseWallet
        openModal={showWalletOption}
        onClose={() => setShowWalletOption(false)}
      />
      {showWalletInfo && (
        <BackgroundAbsolute onClick={() => setShowWalletInfo(false)} />
      )}
      <StyledAccountButton>
        {!account ? (
          <Button
            text="Choose Wallet"
            tracking_id={'connect_wallet'}
            onClick={() => setShowWalletOption(true)}
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
