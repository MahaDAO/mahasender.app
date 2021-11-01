import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'

import {
  SummaryContentTitle,
  SummaryContentText,
  SummarySection,
} from '../../../components/styled/Global'

export default function Confirm() {
  return (
    <section className="container bg_443E3A">
      <h3>Summary</h3>
      <SummarySection>
        <div className={'row_all_center border_b1'}>
          <div className={'flex1Padding20 border_right1'}>
            <SummaryContentTitle>888</SummaryContentTitle>
            <SummaryContentText>Total number of addresses</SummaryContentText>
          </div>
          <div className={'flex1Padding20'}>
            <SummaryContentTitle>0.089 FAU</SummaryContentTitle>
            <SummaryContentText>
              Total number of tokens to be sent
            </SummaryContentText>
          </div>
        </div>
        <div className={'row_all_center border_b1'}>
          <div className={'flex1Padding20 border_right1'}>
            <SummaryContentTitle>2</SummaryContentTitle>
            <SummaryContentText>
              Total number of transactions needed
            </SummaryContentText>
          </div>
          <div className={'flex1Padding20'}>
            <SummaryContentTitle>1,000,000.0000 FAU</SummaryContentTitle>
            <SummaryContentText>Your token balance</SummaryContentText>
          </div>
        </div>
        <div className={'row_all_center'}>
          <div className={'flex1Padding20 border_right1'}>
            <SummaryContentTitle>0.0634 rETH</SummaryContentTitle>
            <SummaryContentText>
              Approximate cost of opration
            </SummaryContentText>
          </div>
          <div className={'flex1Padding20'}>
            <SummaryContentTitle>1.0000 rETH</SummaryContentTitle>
            <SummaryContentText>Your rETH balance</SummaryContentText>
          </div>
        </div>
      </SummarySection>
    </section>
  )
}
