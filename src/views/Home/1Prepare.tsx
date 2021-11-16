import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useDropzone } from 'react-dropzone'
import { ethers } from 'ethers'
import * as _ from 'underscore'
import useStateWithCallback from 'use-state-with-callback'

import TextWrapper from '../../components/TextWrapper'
import SelectOption from '../../components/SelectOptiion'
import UploadIcon from '../../assets/icons/misc/UploadIcon.svg'
import Button from '../../components/Button'
import ImportCSV from '../../components/ImportCSV'

interface PrepareProps {
  handleNext: () => void
}

function Prepare(props: PrepareProps) {
  const { handleNext } = props

  const topFilms = [
    { title: 'Matic - Polygon mainnet native currency' },
    { title: 'ETH - Ethereum mainnet native currency' },
    { title: 'ARTH - 0xe52...4d590' },
  ]

  const InputOption = ['Upload File', 'Insert Manually']

  const [toAddressText, setToAddressText] = useState<string>('Insert Manually')
  const [decimalText, setDeciamText] = useState<string>('18')
  const [listOfAddresses, setListOfAddresses] = useState<any>([])
  const [enteredAdrs, setEnteredAdrs] = useState<any>('')
  const [addressError, setAddressError] = useState<any>([])
  const [arrayOfNoOfLines, setArrayOfNoOfLines] = useState<number[]>()
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()
  const [selectedToken, setSelectedToken] = useState<string | null>(
    InputOption[0],
  )
  const [inputTokenValue, setInputTokenValue] = useState('')
  const [outsideTextarea, setOutsideTextarea] = useState(false)
  const textAreaRef = useRef()

  let fromToken = '0xb4d930279552397bba2ee473229f89ec245bc365'

  useEffect(() => {
    handleError()

    let list = listOfAddresses?.map((item: any) => {
      return `${item.adrs}, ${item.value}`
    })

    console.log('list', list)

    setEnteredAdrs(list.join('\n'))
  }, [listOfAddresses])

  console.log('listOfAddresses', listOfAddresses)
  console.log('addressError', addressError)

  const disableNextBtn =
    ethers.utils.isAddress(fromToken) &&
    addressError.length === 0 &&
    listOfAddresses.length !== 0

  let duplicates: any[]
  duplicates = []

  let duplicatesParents: any[]
  duplicatesParents = []

  const handleManualData = () => {
    let addresses: any[]
    addresses = []

    enteredAdrs.split(/\n/g).map((adrs: string, i: number) => {
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

  const handleCSVData = (data: any) => {
    console.log('data', data)
    let addresses: any[]
    addresses = []
    data?.map((item: any, i: number) => {
      let indexOfComma = item?.indexOf(',')
      let valueTobeSent = item?.slice(indexOfComma + 1, item.length)

      addresses?.push({
        line: i + 1,
        adrs: `${item?.slice(0, indexOfComma)}`,
        value: `${valueTobeSent}`,
      })
    })

    setListOfAddresses(addresses)
  }

  const handleError = () => {
    listOfAddresses?.forEach((item: any, i: any, listOfAddresses: any) => {
      if (!ethers.utils.isAddress(item.adrs))
        setAddressError((prevArray: any) => [
          ...prevArray,
          {
            line: item.line,
            error: `${item.adrs} is invalid address`,
          },
        ])
      if (item.value <= 0)
        setAddressError((prevArray: any) => [
          ...prevArray,
          {
            line: item.line,
            error: `${item.value} is invalid value`,
          },
        ])

      for (let j = i + 1; j < listOfAddresses.length; j++) {
        if (item.adrs === listOfAddresses[j].adrs) {
          setAddressError((prevArray: any) => [
            ...prevArray,
            {
              line: listOfAddresses[j].line,
              error: `duplicate address ${listOfAddresses[j].adrs}`,
            },
          ])
        }
      }
    })
  }

  const deletedErrorRecords = () => {
    setListOfAddresses((items: any) => {
      return items?.filter((item: any) => {
        return _.where(addressError, { line: item.line }).length === 0
      })
    })
    setAddressError([])
  }

  console.log('enteredAdrs', enteredAdrs)

  return (
    <section>
      <div className={'row_spaceBetween_center marginB8'}>
        <div>Token</div>
        <div>Decimal</div>
      </div>
      <div className={'row_spaceBetween_center marginB24'}>
        <div style={{ flex: 9, marginRight: '32px' }}>
          <Autocomplete
            id="combo-box-demo"
            options={topFilms}
            getOptionLabel={(option: any) => option.title}
            style={{ width: '100%', color: '#fff' }}
            renderInput={(params: any) => (
              <TextField
                {...params}
                label=""
                variant="outlined"
                placeholder={'Select or insert token address you want to send'}
                style={{ color: '#fff' }}
              />
            )}
          />
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
        <div style={{ flex: 2 }}>Give addresses with Amounts</div>
        <div style={{ flex: 1 }}>
          <Autocomplete
            id="combo-box-demo"
            options={InputOption}
            value={selectedToken}
            onChange={(event: any, newValue: string | null) => {
              setSelectedToken(newValue)
            }}
            inputValue={inputTokenValue}
            onInputChange={(event, newInputValue) => {
              setInputTokenValue(newInputValue)
            }}
            getOptionLabel={(option: any) => option}
            style={{ width: '100%', color: '#fff' }}
            renderInput={(params: any) => (
              <TextField
                {...params}
                label=""
                variant="outlined"
                placeholder={'Select'}
                style={{ color: '#fff' }}
              />
            )}
          />
        </div>
      </div>

      <UploadFileContainer>
        {selectedToken === 'Upload File' ? (
          <div>
            <ImportCSV />
          </div>
        ) : (
          <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '10px' }}>
              {listOfAddresses.map((item: any, i: number) => (
                <TextWrapper
                  key={i}
                  text={`${i + 1}`}
                  fontFamily={'Inter'}
                  fontWeight={300}
                  fontSize={14}
                  lineHeight={'140%'}
                  Fcolor={'rgba(255, 255, 255, 0.88)'}
                  className={'margin0 marginTB2'}
                />
              ))}
            </div>
            <textarea
              rows={6}
              value={enteredAdrs}
              onChange={(e) => {
                setEnteredAdrs(e.target.value)
              }}
              onBlur={handleManualData}
            />
          </div>
        )}
      </UploadFileContainer>
      <div className={'row_spaceBetween_center marginB42'}>
        <div>Accepted files : CSV, Excel, TXT</div>
        <div>Sample file</div>
      </div>

      {addressError.length ? (
        <section>
          <ErrorContainer>
            {addressError?.map((item: any, i: number) => (
              <ErrorText key={i}>
                Line&nbsp;{item.line} :&nbsp;{item.error}{' '}
              </ErrorText>
            ))}
          </ErrorContainer>
          <DeleteRecord onClick={() => deletedErrorRecords()}>
            Delete wrong records
          </DeleteRecord>
        </section>
      ) : null}

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
  text-align: center;
  margin-bottom: 6px;
  padding: 12px 24px;
`

const TextAreaInputText = styled.div``

const ErrorContainer = styled.div`
  width: 100%;
  height: 92px;
  background-color: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 12px;
  overflow-y: auto;
`

const ErrorText = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 140%;
  color: #fa4c69;
`

const DeleteRecord = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #ff7f57;
  margin-bottom: 40px;
  cursor: pointer;
`
