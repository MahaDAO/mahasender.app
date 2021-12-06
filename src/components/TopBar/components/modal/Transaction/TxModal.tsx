import styled from 'styled-components'
import React, { useMemo, useState } from 'react'
import { useWallet } from 'use-wallet'
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'

import IconLoader from '../../../../IconLoader'
import SingleTransaction from './SingleTransaction'
import ConfirmationModal from '../../../../ConfirmationModal'

import {
  isTransactionRecent,
  useAllTransactions,
  useClearAllTransactions,
} from '../../../../../state/transactions/hooks'
import { TransactionDetails } from '../../../../../utils/interface'

interface props {
  openModal: boolean
  onDismiss: () => void
}

// We want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime
}

const TxModal: React.FC<props> = ({ openModal, onDismiss }) => {
  const { account } = useWallet()

  const allTransactions = useAllTransactions()
  const { clearAllTransactions } = useClearAllTransactions()

  const [openConfirmationModal, setOpenConfirmationModal] = useState<boolean>(
    false,
  )

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs
      .filter((tx) => isTransactionRecent(tx) && tx.from === account)
      .sort(newTransactionsFirst)
  }, [allTransactions, account])

  const handleClose = () => {
    onDismiss()
  }

  if (!openModal) return null

  return (
    <MainDiv>
      <ConfirmationModal
        modalOpen={openConfirmationModal}
        onClose={() => setOpenConfirmationModal(false)}
        modalTitle={'Clear all transaction'}
        title={'Are you sure you want to clear all transaction?'}
        yesText={'Yes'}
        noText={'No'}
        yesAction={() => {
          setOpenConfirmationModal(false)
          clearAllTransactions()
        }}
        noAction={() => setOpenConfirmationModal(false)}
      />
      <BackgroundAbsolute onClick={() => handleClose()} />
      <PositionDiv>
        <WalletDiv>
          <ModalHeader>
            <Title>Recent Transactions</Title>
            <RightSubHeader>
              {sortedRecentTransactions.length > 0 && (
                <ClearAll onClick={() => setOpenConfirmationModal(true)}>
                  Clear all
                </ClearAll>
              )}
              <CrossIcon>
                <IconButton aria-label="close" onClick={() => handleClose()}>
                  <IconLoader iconName={'Cross'} width={24} />
                </IconButton>
              </CrossIcon>
            </RightSubHeader>
          </ModalHeader>
          <ModalBody>
            {sortedRecentTransactions.length === 0 && (
              <div>
                <NoTransaction>
                  You haven’t done any transaction yet.
                </NoTransaction>
                <CallToAction to={'/dashboard'} onClick={() => handleClose()}>
                  Go to Dashboard
                </CallToAction>
              </div>
            )}
            <StyledTransactionList>
              {sortedRecentTransactions.map((tx) => (
                <SingleTransaction key={tx.hash} tx={tx} />
              ))}
            </StyledTransactionList>
          </ModalBody>
        </WalletDiv>
      </PositionDiv>
    </MainDiv>
  )
}

const BackgroundAbsolute = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
  width: 100vw;
  height: 100vh;
  z-index: 1;
`

const MainDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
  width: 100vw;
  height: 100vh;
`

const PositionDiv = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
  position: relative;
`

const WalletDiv = styled.div`
  position: absolute;
  background: linear-gradient(180deg, #48423e 0%, #373030 100%);
  border-radius: 6px;
  right: 60px;
  top: 72px;
  width: 380px;
  z-index: 10;
  transition: 1s ease-in-out;
  @media (max-width: 600px) {
    width: 100vw;
    left: 0;
    right: 0;
  }
`

const ModalHeader = styled.div`
  margin: 12px 24px 0 24px;
  padding: 0 0 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Title = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  margin-bottom: 0;
`

const RightSubHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const ClearAll = styled.p`
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 130%;
  color: rgba(255, 255, 255, 0.32);
  cursor: pointer;
  margin-bottom: 0;
`

const CrossIcon = styled.div`
  margin-right: -12px;
`

const ModalBody = styled.div`
  padding: 24px;
  overflow-y: scroll;
  max-height: calc(360px - 72px);
  @media (max-width: 600px) {
    max-height: calc(100vh - 114px);
  }
`

const NoTransaction = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 150%;
  color: rgba(255, 255, 255, 0.88);
  margin-bottom: 8px;
  padding: 0 12px;
  text-align: center;
`

const CallToAction = styled(Link)`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 150%;
  color: #f7653b;
  text-align: center;
  width: 100%;
  display: block;
  &:hover {
    color: #f7653b;
  }
`

const StyledTransactionList = styled.div`
  display: flex;
  flex-direction: column;
`

export default TxModal
