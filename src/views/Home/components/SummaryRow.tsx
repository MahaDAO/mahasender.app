import TextWrapper from '../../../components/TextWrapper'

interface SummaryRowProp {
  field: string
  amount: string
  unit?: string
}

export default function SummaryRow(props: SummaryRowProp) {
  const { field, amount, unit } = props

  return (
    <div className={'row_spaceBetween_center marginB8'}>
      <TextWrapper
        text={`${field}`}
        fontWeight={600}
        fontSize={14}
        lineHeight={'20px'}
        Fcolor={'rgba(255, 255, 255, 0.64)'}
      />
      <div className={'row_all_center'}>
        <TextWrapper
          text={`${amount}`}
          className={'marginR4'}
          fontWeight={600}
          fontSize={14}
          lineHeight={'20px'}
          Fcolor={'rgba(255, 255, 255, 0.88)'}
        />
        {unit && (
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '4px',
              padding: '2px 8px',
            }}
          >
            <TextWrapper
              text={`${unit}`}
              fontWeight={600}
              fontSize={12}
              lineHeight={'150%'}
              Fcolor={'rgba(255, 255, 255, 0.64)'}
              className={'line_spacing008em'}
            />
          </div>
        )}
      </div>
    </div>
  )
}
