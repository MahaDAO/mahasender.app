import { useState } from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

import {
  SummaryContentTitle,
  SummaryContentText,
  SummarySection,
} from '../../../components/styled/Global'

export default function Approve() {
  const [amountRadio, setAmountRadio] = useState('Exact amount to be sent')

  const handleAmountRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmountRadio((event.target as HTMLInputElement).value)
  }

  return (
    <section className="container bg_443E3A">
      <h3>Summary</h3>
      <SummarySection>
        <div className={'row_all_center border_b1'}>
          <div className={'flex1Padding20 border_right1'}>
            <SummaryContentTitle>0.000 FAU</SummaryContentTitle>
            <SummaryContentText>
              Your current bulksender allowance
            </SummaryContentText>
          </div>
          <div className={'flex1Padding20'}>
            <SummaryContentTitle>0.089 FAU</SummaryContentTitle>
            <SummaryContentText>
              Total number of tokens to be sent
            </SummaryContentText>
          </div>
        </div>
        <div className={'row_all_center'}>
          <div className={'flex1Padding20 border_right1'}>
            <SummaryContentTitle>1.000 rETH</SummaryContentTitle>
            <SummaryContentText>Your rETH balance</SummaryContentText>
          </div>
          <div className={'flex1Padding20'}>
            <SummaryContentTitle>1,000,000.0000 FAU</SummaryContentTitle>
            <SummaryContentText>Your token balance</SummaryContentText>
          </div>
        </div>
      </SummarySection>

      <h3>Amount to approve</h3>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={amountRadio}
          onChange={handleAmountRadio}
          className={'flex_row'}
        >
          <FormControlLabel
            value="exactAmt"
            control={<Radio />}
            label="Exact amount to be sent"
          />
          <FormControlLabel
            value="fullTokenBalance"
            control={<Radio />}
            label="Your full token balance (100000)"
          />
        </RadioGroup>
      </FormControl>
      <br />
      <ApproveTxnHash>
        <div>Approve transaction hash</div>
        <div className={'row_spaceBetween_center marginB20'}>
          <div>0x61837551968B5496c63EbCC82cBfE2C8e1Fe798c</div>
          <div>icon</div>
        </div>
        <div>Constructing the bulksending data</div>
      </ApproveTxnHash>

      {/* <Button variant="contained" onClick={() => {}} className={'btn_outlined'}>
        Approve
      </Button> */}
    </section>
  )
}

const ApproveTxnHash = styled.div`
  background-color: #151414;
  color: #fff;
  padding: 20px;
  border-radius: 5px;
  margin-top: 20px;
`
