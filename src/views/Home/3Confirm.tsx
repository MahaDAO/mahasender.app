import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { useWallet } from 'use-wallet'

import TextWrapper from '../../components/TextWrapper'
import SummaryRow from './components/SummaryRow'
import Button from '../../components/Button'
import useTokenBalance from '../../hooks/useTokenBalance'
import {
  getDisplayBalanceToken,
  formatToBNToken,
} from '../../utils/formatBalance'
import useBulkTransfer from '../../hooks/callbacks/useBulkTransfer'
import { balanceToDecimal } from '../../utils/etherUtils'

interface ConfirmProps {
  handleNext: (adrs?: []) => void
  handleBack: () => void
  textAreaFields: any
  storedEnteredAdrs: string
  setTxHashes: (txHashes: string[]) => void
}

export default function Confirm(props: ConfirmProps) {
  const {
    handleNext,
    handleBack,
    textAreaFields,
    storedEnteredAdrs,
    setTxHashes,
  } = props
  const { balance } = useWallet()
  const ethBalance = ethers.utils.formatEther(balance)
  const tokenBalance = useTokenBalance(textAreaFields.selectedToken)

  const [addressArray, setAddressArray] = useState<any[]>([])
  const [valuesArray, setValuesArray] = useState<any[]>([])
  const [listOfAddresses, setListOfAddresses] = useState<any[]>([])
  const [disableSendBtn, setDisableSendBtn] = useState<boolean>(false)

  useEffect(() => {
    let addresses: any[]
    addresses = []

    if (storedEnteredAdrs.length > 0) {
      storedEnteredAdrs.split(/\n/g).map((adrs: string, i: number) => {
        let indexOfComma = adrs.indexOf(',')
        let valueTobeSent = adrs.slice(indexOfComma + 1, adrs.length)

        addresses?.push({
          line: i + 1,
          adrs: `${adrs.slice(0, indexOfComma)}`,
          value: `${valueTobeSent}`,
        })
      })
      setListOfAddresses(addresses)
    }
  }, [storedEnteredAdrs])

  useEffect(() => {
    if (listOfAddresses?.length > 0) {
      console.log('useeffect if')

      listOfAddresses?.map((item: any) => {
        console.log('item', item.adrs, item.value)
        setAddressArray((state) => [...state, item.adrs])
        setValuesArray((state) => [
          ...state,
          formatToBNToken(item.value, textAreaFields.selectedToken),
        ])
      })
    }
  }, [listOfAddresses])

  const bulkTransferAction = useBulkTransfer(
    textAreaFields.selectedToken.address,
    addressArray,
    valuesArray,
    textAreaFields.noOfTxns,
  )
  console.log('balanceToDecimal', balanceToDecimal('1'))
  console.log('addressArray', addressArray, valuesArray)

  const sendHandler = () => {
    console.log('sendHandler', addressArray, valuesArray)
    setDisableSendBtn(true)
    bulkTransferAction(() => {
      handleNext()
    }, setTxHashes)
  }

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
      <section className={'marginB42'}>
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
      </section>

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
            text={'Send'}
            onClick={sendHandler}
            disabled={disableSendBtn}
          />
        </div>
      </div>
    </section>
  )
}
