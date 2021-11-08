import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import copyText from 'copy-to-clipboard'
import Loader from 'react-spinners/BeatLoader'
import React, { useEffect, useState } from 'react'

import TextWrapper from '../../../../TextWrapper'
import Button from '../../../../Button'
import theme from '../../../../../theme'
import IconLoader from '../../../../IconLoader'
import ConfirmationModal from '../../../../ConfirmationModal'

import { truncateMiddle } from '../../../../../utils'
import useBalance from '../../../../../hooks/useBalance'
import MetamaskImg from '../../../../../assets/images/Metamask.svg'
import { getDisplayBalance } from '../../../../../utils/formatBalance'

const WalletInfo = () => {
  const [isCopied, setIsCopied] = useState<boolean>(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(
    false,
  )

  const { account } = useWallet()
  const bnbBalance = useBalance()

  useEffect(() => {
    if (isCopied) {
      const hide = setTimeout(() => {
        setIsCopied(false)
      }, 500)

      return () => {
        clearTimeout(hide)
      }
    }
  }, [isCopied, setIsCopied])

  return (
    <MainContainer>
      <ConfirmationModal
        modalOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        modalTitle={'Disconnect Wallet'}
        title={`Are you sure you want to disconnect ${truncateMiddle(
          account || '',
          15,
        )}?`}
        subtitle={`${account || ''}`}
        yesText={'Disconnect'}
        noText={'Cancel'}
        yesAction={() => {
          setShowConfirmationModal(false)
          localStorage.setItem('disconnectWallet', '1')
          window.location.reload()
        }}
        noAction={() => setShowConfirmationModal(false)}
      />
      <WalletHeader className="single-line-center-between bottom-divider">
        <TextWrapper text={'Your Account'} fontWeight={600} fontSize={16} />
        <div className="single-line-center-start">
          <img src={MetamaskImg} height={32} className="m-r-8" alt="metamask" />
          <TextWrapper
            text={`${truncateMiddle(account || '', 12, '...')}`}
            fontWeight={600}
            fontSize={16}
            className="m-r-8"
          />
          {isCopied ? (
            <IconLoader iconName={'Copied'} />
          ) : (
            <IconLoader
              iconName={'Copy'}
              onClick={() => {
                const didCopy = copyText(account?.toString() || '')
                setIsCopied(didCopy)
              }}
              className="pointer"
            />
          )}
        </div>
      </WalletHeader>
      <WalletBody>
        <div className="single-line-center-between m-b-20">
          <div className="single-line-center-start">
            <IconLoader
              iconName={'BNB'}
              iconType="tokenSymbol"
              className="m-r-12"
              height={44}
              width={44}
            />
            {bnbBalance.isLoading ? (
              <Loader color={'#ffffff'} loading={true} size={8} margin={2} />
            ) : (
              <TextWrapper
                text={`${Number(
                  getDisplayBalance(bnbBalance.value, 18, 3),
                ).toLocaleString('en-US', { maximumFractionDigits: 2 })} BNB`}
                fontWeight={600}
              />
            )}
          </div>
          <TextWrapper
            text={''}
            fontWeight={600}
            Fcolor={theme.color.transparent[100]}
          />
        </div>
        <Button
          variant={'transparent'}
          onClick={() => setShowConfirmationModal(true)}
        >
          Disconnect
        </Button>
      </WalletBody>
    </MainContainer>
  )
}

export default WalletInfo

const MainContainer = styled.div`
  width: 100%;
`

const WalletHeader = styled.div`
  padding-bottom: 16px;
`

const WalletBody = styled.div`
  padding: 24px 0 0 0;
`
