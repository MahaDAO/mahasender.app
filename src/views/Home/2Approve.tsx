import React, { useEffect, useState, useMemo } from 'react'
import styled from 'styled-components'
import FormControl from '@material-ui/core/FormControl'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import { NumberFormat } from 'xlsx'
import { useWallet } from 'use-wallet'
import { ethers } from 'ethers'

import TextWrapper from '../../components/TextWrapper'
import SummaryRow from './components/SummaryRow'
import Button from '../../components/Button'
import ErrorIcon from '../../assets/icons/infoTip/Error.svg'
import useTokenBalance from '../../hooks/useTokenBalance'
import useCore from '../../hooks/useCore'
import useApprove, { ApprovalState } from '../../hooks/callbacks/useApprove'
import { getDisplayBalanceToken } from '../../utils/formatBalance'

interface ApproveProps {
  handleNext: (adrs?: []) => void
  handleBack: () => void
  textAreaFields: any
}

export default function Approve(props: ApproveProps) {
  const { handleNext, handleBack, textAreaFields } = props

  const { balance } = useWallet()
  const core = useCore()
  const ethBalance = ethers.utils.formatEther(balance)

  const [amountRadio, setAmountRadio] = useState<string>('exactAmt')
  const [amountToApprove, setAmountToApprove] = useState<string>('')

  const tokenBalance = useTokenBalance(textAreaFields.selectedToken)

  console.log(
    'core.contracts',
    core.contracts,
    core.contracts.MahaSender.address,
  )

  const [approveStatus, approve] = useApprove(
    textAreaFields.selectedToken,
    core.contracts.MahaSender.address,
  )

  const isApproved = useMemo(() => approveStatus === ApprovalState.APPROVED, [
    approveStatus,
  ])

  // const isApproved = false

  const isApproving = useMemo(() => approveStatus === ApprovalState.PENDING, [
    approveStatus,
  ])

  useEffect(() => {
    if (amountRadio === 'exactAmt')
      setAmountToApprove(textAreaFields.noOfTokens)
    else
      setAmountToApprove(
        Number(
          getDisplayBalanceToken(
            tokenBalance.value,
            textAreaFields.selectedToken,
            3,
          ),
        ).toLocaleString('en-US', { minimumFractionDigits: 3 }),
      )
  }, [amountRadio])

  useEffect(() => {
    if (isApproved) handleNext()
  }, [isApproved])

  const handleAmountRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmountRadio((event.target as HTMLInputElement).value)
  }

  const disableNextBtn = !textAreaFields.inSufficientBal

  console.log('ethBalance', ethBalance)
  console.log(
    'tokenBalance',
    tokenBalance.isLoading,
    tokenBalance.value.toString(),
  )

  // if (isApproved) handleNext()

  console.log('isApproved', isApproved)

  return (
    <section>
      <TextWrapper
        text={'Summary'}
        fontWeight={600}
        fontSize={14}
        lineHeight={'20px'}
        Fcolor={'rgba(255, 255, 255, 0.88)'}
        className={'marginB12'}
      />
      <SummaryRow
        field={'Total number of addresses'}
        amount={`${textAreaFields.noOfAdrs}`}
      />
      <SummaryRow
        field={'Total number of tokens to be sent'}
        amount={`${textAreaFields.noOfTokens}`}
        unit={`${textAreaFields.selectedToken.symbol}`}
      />
      <SummaryRow
        field={'Total number of transactions needed'}
        amount={`${textAreaFields.noOfTxns}`}
      />
      <SummaryRow
        field={'Your token balance'}
        amount={`${Number(
          getDisplayBalanceToken(
            tokenBalance.value,
            textAreaFields.selectedToken,
            3,
          ),
        ).toLocaleString('en-US', { minimumFractionDigits: 3 })}`}
        unit={`${textAreaFields.selectedToken.symbol}`}
      />
      {/* <SummaryRow
        field={'Approximate cost of operation '}
        amount={'0'}
        unit={`${textAreaFields.selectedToken.symbol}`}
      />
      <SummaryRow
        field={'Your MAHA balance '}
        amount={'0.0100'}
        unit={`${textAreaFields.selectedToken.symbol}`}
      /> */}
      <div className={'divider marginT24 marginB24'}></div>
      <TextWrapper
        text={'Amount to approve'}
        fontWeight={600}
        fontSize={14}
        lineHeight={'20px'}
        Fcolor={'rgba(255, 255, 255, 0.88)'}
        className={'marginB12'}
      />
      <FormControl component="fieldset" className={'marginB64'}>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={amountRadio}
          onChange={handleAmountRadio}
          className={'flex_row'}
        >
          <FormControlLabel
            value="exactAmt"
            control={
              <Radio
                className={`${
                  amountRadio === 'exactAmt' ? 'orange_text' : 'rgb256_064_text'
                }`}
              />
            }
            label="Exact amount to be sent"
          />

          <FormControlLabel
            value="fullTokenBal"
            control={
              <Radio
                className={`${
                  amountRadio === 'fullTokenBal'
                    ? 'orange_text'
                    : 'rgb256_064_text'
                }`}
              />
            }
            label="Your full token balance"
          />
        </RadioGroup>
        <FormHelperText className={'marginB42'}>
          {amountRadio === 'fullTokenBal' ? amountToApprove : ''}{' '}
        </FormHelperText>
      </FormControl>
      {textAreaFields.inSufficientBal ? (
        <ErrorAlert>
          <img src={ErrorIcon} alt={'ErrorIcon'} className={'marginR12'} />
          <div>
            <TextWrapper
              text={`Insufficient ${textAreaFields.selectedToken.symbol} balance`}
              fontWeight={300}
              fontSize={12}
              lineHeight={'130%'}
              Fcolor={'#FA4C69'}
              className={''}
            />
          </div>
        </ErrorAlert>
      ) : null}

      <div className={'flex_row'}>
        <div className={'marginR20 flex1'}>
          <Button
            text={'Back'}
            variant={'outlined'}
            onClick={() => {
              handleBack()
            }}
          />
        </div>
        <div className={'flex1'}>
          <Button
            text={'Confirm'}
            onClick={() => {
              console.log('approve', approve())
            }}
            disabled={!disableNextBtn}
            loading={isApproving}
          />
        </div>
      </div>
    </section>
  )
}

const ErrorAlert = styled.div`
  padding: 8px;
  background: #4b4443;
  border-radius: 4px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 28px;
`
