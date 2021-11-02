import { useState } from 'react'
import styled from 'styled-components'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import FormControl from '@material-ui/core/FormControl'
import PublishSharpIcon from '@material-ui/icons/PublishSharp'
import { useDropzone } from 'react-dropzone'
import { ethers } from 'ethers'

import SelectOption from '../../../components/SelectOptiion'
import ImportCSV from '../../../components/ImportCSV'
export default function Prepare() {
  const [toAddressText, setToAddressText] = useState<string>('Insert Manually')
  const [decimalText, setDeciamText] = useState<string>('18')
  const [listOfAddresses, setListOfAddresses] = useState<any>([])
  const [enteredAdrs, setEnteredAdrs] = useState<string>('')
  // const [addressError, setAddressError] = useState<any>([])
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()

  let addressError: string[]
  addressError = []

  const files = acceptedFiles?.map((file) => {
    return (
      <li key={file?.name}>
        {file?.name} - {file?.size} bytes
      </li>
    )
  })

  const handleValidate = async () => {
    await setListOfAddresses(enteredAdrs.split(/\n/g))

    listOfAddresses?.forEach((item: any, index: any) => {
      let indexOfComma = item.indexOf(',')

      let valueTobeSent = item.slice(indexOfComma + 1, item.length)

      if (!ethers.utils.isAddress(item.slice(0, indexOfComma)))
        addressError.push(`${item.slice(0, indexOfComma)} is invalid Address`)

      if (valueTobeSent <= 0)
        addressError.push(`${valueTobeSent} is invalid value`)
    })
    console.log('addressError', addressError)

    console.log('addressess', enteredAdrs.split(/\n/g))
  }

  console.log('listOfAddresses', listOfAddresses)

  return (
    <section className="container bg_443E3A">
      <section className="row_spaceBetween_center">
        <div style={{ flex: 1, marginRight: 20 }}>
          <h3>Token</h3>
          <SelectOption />
        </div>
        <div>
          <h3>Decimals</h3>
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
      </section>

      <div className="row_spaceBetween_center">
        <h3>Addresses with Amounts</h3>
        <p
          className="pointer underline"
          onClick={() => {
            if (toAddressText === 'Insert Manually')
              setToAddressText('Upload file')
            else setToAddressText('Insert Manually')
          }}
        >
          {toAddressText}
        </p>
      </div>

      {toAddressText !== 'Insert Manually' ? (
        <section>
          <FormControl className={'insertManuallyFormcontrol'}>
            <OutlinedInput
              id="outlined-adornment-weight"
              placeholder={'Insert address and amount separated by comma'}
              value={enteredAdrs}
              onChange={(e) => {
                setEnteredAdrs(e.target.value)
              }}
              // onKeyDown={(e) => {
              //   if (e.key === 'Enter') {
              //     setListOfAddresses([...listOfAddresses, enteredAdrs])
              //   }
              // }}
              // onKeyUp={(e) => {}}

              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                'aria-label': 'weight',
              }}
              labelWidth={0}
              className={'white_text'}
              multiline
              rows={5}
            />
          </FormControl>

          {/* <ol>
            {listOfAddresses?.map((address: any) => (
              <li key={address}> {address} </li>
            ))}
          </ol> */}
          <ol>
            {addressError?.map((item: any, i: any) => (
              <li key={i}> {item} </li>
            ))}
          </ol>
          <br />
          <button onClick={handleValidate}>Test</button>
        </section>
      ) : (
        <section>
          <Dropfile className="text_center">
            <ImportCSV />
          </Dropfile>

          <div>
            <ul>{files}</ul>
          </div>
        </section>
      )}
    </section>
  )
}

const Dropfile = styled.div`
  padding: 20px;
  background-color: #151414;
  color: #fff;
  text-align: center;
`
