import { useState } from 'react'
import styled from 'styled-components'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import FormControl from '@material-ui/core/FormControl'
import { useDropzone } from 'react-dropzone'
import { ethers } from 'ethers'

import TextWrapper from '../../components/TextWrapper'
import SelectOption from '../../components/SelectOptiion'
import UploadIcon from '../../assets/icons/misc/UploadIcon.svg'
import Button from '../../components/Button'

interface PrepareProps {
  handleNext: () => void
}

function Prepare(props: PrepareProps) {
  const { handleNext } = props

  const [toAddressText, setToAddressText] = useState<string>('Insert Manually')
  const [decimalText, setDeciamText] = useState<string>('18')
  const [listOfAddresses, setListOfAddresses] = useState<any>([])
  const [enteredAdrs, setEnteredAdrs] = useState<any>('')
  const [addressError, setAddressError] = useState<any>([])
  const [arrayOfNoOfLines, setArrayOfNoOfLines] = useState<number[]>()
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()

  let fromToken = '0xb4d930279552397bba2ee473229f89ec245bc365'

  const disableNextBtn =
    ethers.utils.isAddress(fromToken) &&
    addressError.length === 0 &&
    listOfAddresses.length !== 0

  return (
    <section>
      <div className={'row_spaceBetween_center marginB8'}>
        <div>Token</div>
        <div>Decimal</div>
      </div>
      <div className={'row_spaceBetween_center marginB24'}>
        <div style={{ flex: 9, marginRight: '32px' }}>
          <SelectOption />
        </div>
        <div style={{ flex: 1 }}>
          <FormControl
            style={{
              backgroundColor: '#151414',
              borderRadius: '5px',
            }}
          >
            <OutlinedInput
              id="outlined-adornment-weight"
              value={decimalText}
              onChange={(e) => {
                setDeciamText(e.target.value)
              }}
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                'aria-label': 'weight',
              }}
              labelWidth={0}
              className={'white_text'}
            />
          </FormControl>
        </div>
      </div>
      <div className={'row_spaceBetween_center marginB8'}>
        <div>Give addresses with Amounts</div>
        <div></div>
      </div>

      <UploadFileContainer>
        {/* <div style={{ display: 'flex' }}>
          <div>
            <div style={{ lineHeight: '50px' }}>1</div>
            <div style={{ lineHeight: '50px' }}>2</div>
            <div style={{ lineHeight: '50px' }}>3</div>
          </div>
          <textarea
            value={enteredAdrs}
            onChange={(e) => {
              setEnteredAdrs(e.target.value)
            }}
            style={{ lineHeight: '40px' }}
          />
        </div> */}
        <img src={UploadIcon} alt={'UploadIcon'} />
        <TextWrapper text={'drag and drop file here or click to upload'} />
      </UploadFileContainer>
      <div className={'row_spaceBetween_center marginB42'}>
        <div>Accepted files : CSV, Excel, TXT</div>
        <div>Sample file</div>
      </div>
      <Button
        text={'Next'}
        onClick={() => handleNext()}
        disabled={disableNextBtn}
      />
    </section>
  )
}

export default Prepare

const UploadFileContainer = styled.div`
  background: #151414;
  border-radius: 6px;
  width: 100%;
  padding: 80px 151px;
  text-align: center;
  margin-bottom: 6px;
  /* padding: 12px 0 0 24px; */
`
