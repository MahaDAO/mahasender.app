import { ethers } from 'ethers'
import { useWallet } from 'use-wallet'

import TextWrapper from '../../components/TextWrapper'
import SummaryRow from './components/SummaryRow'
import Button from '../../components/Button'

interface ConfirmProps {
  handleNext: (adrs?: []) => void
  handleBack: () => void
  textAreaFields: any
}

export default function Confirm(props: ConfirmProps) {
  const { handleNext, handleBack, textAreaFields } = props
  const { balance } = useWallet()
  const ethBalance = ethers.utils.formatEther(balance)

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
            onClick={() => {
              handleNext()
            }}
          />
        </div>
      </div>
    </section>
  )
}
