import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import FormControl from '@material-ui/core/FormControl'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { NumberFormat } from 'xlsx'
import { useWallet } from 'use-wallet'
import { ethers } from 'ethers'

import TextWrapper from '../../components/TextWrapper'
import SummaryRow from './components/SummaryRow'
import Button from '../../components/Button'
import ErrorIcon from '../../assets/icons/infoTip/Error.svg'
import useTokenBalance from '../../hooks/useTokenBalance'
import useCore from '../../hooks/useCore'

interface ApproveProps {
  handleNext: (adrs?: []) => void
  handleBack: () => void
  amountToApproveFn: (val: any) => void
  textAreaFields: any
}

export default function Approve(props: ApproveProps) {
  const { handleNext, handleBack, amountToApproveFn, textAreaFields } = props

  const { balance } = useWallet()
  const core = useCore()
  const ethBalance = ethers.utils.formatEther(balance)

  const mahaBalance = useTokenBalance(core.tokens['MAHA'])

  const [amountRadio, setAmountRadio] = useState<string>('exactAmt')

  useEffect(() => {
    if (amountRadio === 'exactAmt') amountToApproveFn(textAreaFields.noOfTokens)
    else amountToApproveFn(10000)
  }, [amountRadio])

  const handleAmountRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmountRadio((event.target as HTMLInputElement).value)
  }

  console.log('ethBalance', ethBalance)
  console.log('mahaBalance', mahaBalance)

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
        amount={`${ethBalance}`}
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
      {textAreaFields.inSufficinetBal ? (
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
