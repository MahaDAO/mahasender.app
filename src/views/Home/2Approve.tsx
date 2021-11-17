import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import FormControl from '@material-ui/core/FormControl'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { NumberFormat } from 'xlsx'
import { useWallet } from 'use-wallet'

import TextWrapper from '../../components/TextWrapper'
import SummaryRow from './components/SummaryRow'
import Button from '../../components/Button'
import ErrorIcon from '../../assets/icons/infoTip/Error.svg'

interface ApproveProps {
  handleNext: (adrs?: []) => void
  handleBack: () => void
  noOfAdrs?: number
  noOfTxns?: number
  noOfTokens?: number
  inSufficinetBal?: boolean
  ethBalance?: string
}

export default function Approve(props: ApproveProps) {
  const {
    handleNext,
    handleBack,
    noOfAdrs = 0,
    noOfTxns = 0,
    noOfTokens = 0,
    inSufficinetBal = false,
    ethBalance,
  } = props

  const { balance } = useWallet()

  const [amountRadio, setAmountRadio] = useState<string>('exactAmt')

  // let noOfTxns = Math.ceil(noOfAdrs / 5)

  const handleAmountRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmountRadio((event.target as HTMLInputElement).value)
  }

  return (
    <section>
      <TextWrapper
        text={'Summary'}
        fontWeight={600}
        fontSize={14}
        lineHeight={'20px'}
        Fcolor={'rgba(255, 255, 255, 0.88)'}
        className={'margin0 marginB12'}
      />
      <SummaryRow field={'Total number of addresses'} amount={`${noOfAdrs}`} />
      <SummaryRow
        field={'Total number of tokens to be sent'}
        amount={`${noOfTokens}`}
        unit={'MAHA'}
      />
      <SummaryRow
        field={'Total number of transactions needed'}
        amount={`${noOfTxns}`}
      />
      <SummaryRow
        field={'Your token balance'}
        amount={`${ethBalance}`}
        unit={'MAHA'}
      />
      {/* <SummaryRow
        field={'Approximate cost of operation '}
        amount={'0'}
        unit={'MAHA'}
      />
      <SummaryRow
        field={'Your MAHA balance '}
        amount={'0.0100'}
        unit={'MAHA'}
      /> */}
      <div className={'divider marginT24 marginB24'}></div>
      <TextWrapper
        text={'Amount to approve'}
        fontWeight={600}
        fontSize={14}
        lineHeight={'20px'}
        Fcolor={'rgba(255, 255, 255, 0.88)'}
        className={'margin0 marginB12'}
      />
      <FormControl component="fieldset" className={'marginB64'}>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={amountRadio}
          onChange={handleAmountRadio}
          className={'flex_row marginB42'}
        >
          <FormControlLabel
            value="exactAmt"
            control={<Radio className={'orange_text'} />}
            label="Exact amount to be sent"
          />

          <FormControlLabel
            value="fullTokenBal"
            control={<Radio className={'rgb256_064_text'} />}
            label="Your full token balance"
          />
        </RadioGroup>
      </FormControl>
      {inSufficinetBal ? (
        <ErrorAlert>
          <img src={ErrorIcon} alt={'ErrorIcon'} className={'marginR12'} />
          <div>
            <TextWrapper
              text={`Insufficient MAHA balance`}
              fontWeight={300}
              fontSize={12}
              lineHeight={'130%'}
              Fcolor={'#FA4C69'}
              className={'margin0'}
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
              handleNext()
            }}
          />
        </div>
      </div>
    </section>
  )
}

const ErrorAlert = styled.div`
  padding: 8px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 28px;
`
