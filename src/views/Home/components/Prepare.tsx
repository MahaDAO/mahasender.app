import { useState } from 'react'
import styled from 'styled-components'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import FormControl from '@material-ui/core/FormControl'
import PublishSharpIcon from '@material-ui/icons/PublishSharp'
import { useDropzone } from 'react-dropzone'

import SelectOption from '../../../components/SelectOptiion'

export default function Prepare() {
  const [toAddressText, setToAddressText] = useState<string>('Insert Manually')
  const [decimalText, setDeciamText] = useState<string>('18')
  const [listOfAddresses, setListOfAddresses] = useState<any>([])
  const [enteredAdrs, setEnteredAdrs] = useState<any>('')
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()

  const files = acceptedFiles?.map((file) => {
    return (
      <li key={file?.name}>
        {file?.name} - {file?.size} bytes
      </li>
    )
  })

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
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setListOfAddresses([...listOfAddresses, enteredAdrs])
                }
              }}
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                'aria-label': 'weight',
              }}
              labelWidth={0}
              className={'white_text'}
              multiline
              rows={4}
            />
          </FormControl>

          <ol>
            {listOfAddresses?.map((address: any) => (
              <li key={address}> {address} </li>
            ))}
          </ol>
        </section>
      ) : (
        <section>
          <Dropfile className="">
            <div {...getRootProps({ className: '' })}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
              <PublishSharpIcon />
            </div>
          </Dropfile>
          <aside>
            <ul>{files}</ul>
          </aside>
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
