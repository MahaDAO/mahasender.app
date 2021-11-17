import TextWrapper from '../../components/TextWrapper'
import SummaryRow from './components/SummaryRow'
import Button from '../../components/Button'

interface ConfirmProps {
  handleNext: (adrs?: []) => void
  handleBack: () => void
  ethBalance?: string
}

export default function Confirm(props: ConfirmProps) {
  const { handleNext, handleBack, ethBalance } = props

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
        <SummaryRow field={'Total number of addresses'} amount={'1'} />
        <SummaryRow
          field={'Total number of tokens to be sent'}
          amount={'300'}
          unit={'MATIC'}
        />
        <SummaryRow
          field={'Total number of transactions needed'}
          amount={'0'}
        />
        <SummaryRow
          field={'Your token balance'}
          amount={'0.0100 0 '}
          unit={'MATIC'}
        />
        <SummaryRow
          field={'Approximate cost of operation '}
          amount={'0'}
          unit={'MATIC'}
        />
        <SummaryRow
          field={'Your MATIC balance '}
          amount={'0.0100'}
          unit={'MATIC'}
        />
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
