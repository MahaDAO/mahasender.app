import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import {
  createStyles,
  makeStyles,
  withStyles,
  Theme,
} from '@material-ui/core/styles'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputBase from '@material-ui/core/InputBase'
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete'
import { useDropzone } from 'react-dropzone'
import { Contract, ethers } from 'ethers'
import * as _ from 'underscore'
import useStateWithCallback from 'use-state-with-callback'
import { useWallet } from 'use-wallet'
import CsvDownloader from 'react-csv-downloader'

import useCore from '../../hooks/useCore'
import TextWrapper from '../../components/TextWrapper'
import SelectOption from '../../components/SelectOptiion'
import UploadIcon from '../../assets/icons/misc/UploadIcon.svg'
import Button from '../../components/Button'
import ImportCSV from '../../components/ImportCSV'
import AccountButton from '../../components/TopBar/components/AccountButton'
import ERC20 from '../../protocol/ERC20'
import ABIS from '../../protocol/deployments/abi'
import IconLoader from '../../components/IconLoader'
import AlertSnackbar from '../../components/AlertSnackbar'
// import SampleMahasender from '../../assets/temp/SampleMahasender.csv'
interface PrepareProps {
  handleNext: (adrs: []) => void
  selectedTokenFn: (token: any) => void
  setTokenFn: (token: any) => void
  setEnteredAdrsFn: (adrs: any) => void
  storedSelectedToken?: any
  storedEnteredAdrs?: any
}

const filter = createFilterOptions<any>()

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 6,
      position: 'relative',
      fontWeight: 400,
      backgroundColor: '#514C49',
      fontSize: '14px',
      lineHeight: '20px',
      padding: '12px 26px 12px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      fontFamily: 'Inter',
      color: 'rgba(255, 255, 255, 0.88)',
      '&:focus': {
        borderRadius: 6,
        position: 'relative',
        fontWeight: 400,
        backgroundColor: '#514C49',
        fontSize: '14px',
        lineHeight: '20px',
        padding: '12px 26px 12px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        fontFamily: 'Inter',
        color: 'rgba(255, 255, 255, 0.88)',
      },
    },
  }),
)(InputBase)

function Prepare(props: PrepareProps) {
  const {
    handleNext,
    selectedTokenFn,
    storedSelectedToken,
    storedEnteredAdrs,
    setTokenFn,
    setEnteredAdrsFn,
  } = props

  const { account, chainId, status } = useWallet()
  const core = useCore()

  const [listOfAddresses, setListOfAddresses] = useState<any>([])
  const [enteredAdrs, setEnteredAdrs] = useState<any>(storedEnteredAdrs)
  const [addressError, setAddressError] = useState<any>([])
  const [addAdrsDropdown, setaddAdrsDropdown] = useState<string | null>(
    'Insert Manually',
  )
  const [lineNumbers, setLineNumbers] = useState<number[]>([])
  const [selectedToken, setSelectedToken] = useState<any>(storedSelectedToken)
  const [listOfTokens, setListOfTokens] = useState<ERC20[]>([])
  const [stringTokens, setStringTokens] = useState<any[]>([])
  const [tokenInputValue, setTokenInputValue] = useState<string>('')
  const [showWarning, setShowWarning] = useState<boolean>(false)

  const [open, toggleOpen] = useState(false)

  useEffect(() => {
    setListOfTokens(
      Object.keys(core.tokens).map((key) => {
        return core.tokens[key]
      }),
    )
  }, [core.tokens])

  useEffect(() => {
    setStringTokens(
      listOfTokens?.map((item: any, i: number) => {
        return {
          address: item.address,
          symbol: item.symbol,
          decimal: item.decimal,
        }
      }),
    )
  }, [listOfTokens])

  useEffect(() => {
    handleError()

    let list = listOfAddresses?.map((item: any) => {
      return `${item.adrs},${item.value}`
    })
    setEnteredAdrs(list.join('\n'))
    setEnteredAdrsFn(list.join('\n'))

    if (listOfAddresses.length > 0) {
      setLineNumbers([])

      for (let i = 1; i <= listOfAddresses.length; i++) {
        setLineNumbers((oldArray) => [...oldArray, i])
      }
    } else {
      setLineNumbers([])
    }
  }, [listOfAddresses])

  useEffect(() => {
    if (storedEnteredAdrs?.length) {
      setEnteredAdrs(storedEnteredAdrs)
    }
  }, [storedEnteredAdrs])

  useEffect(() => {
    selectedTokenFn(selectedToken)
    setTokenFn(selectedToken)
  }, [selectedToken])

  const disableNextBtn =
    ethers.utils.isAddress(selectedToken?.address) &&
    addressError?.length === 0 &&
    listOfAddresses?.length !== 0

  const handleManualData = () => {
    let addresses: any[] = []

    if (enteredAdrs.length > 0) {
      enteredAdrs.split(/\n/g).map((adrs: string, i: number) => {
        console.log('handleManualData adrs', adrs)
        let indexOfComma = adrs.indexOf(',')
        let valueTobeSent
        if (adrs.length > 0) {
          if (indexOfComma === -1) {
            console.log('no value')
            valueTobeSent = 0
            addresses?.push({
              line: i + 1,
              adrs: `${adrs}`,
              value: `${valueTobeSent}`,
            })
          } else {
            valueTobeSent = adrs.slice(indexOfComma + 1, adrs.length)
            addresses?.push({
              line: i + 1,
              adrs: `${adrs.slice(0, indexOfComma)}`,
              value: `${valueTobeSent}`,
            })
          }
        }

        console.log('indexOfComma', indexOfComma, valueTobeSent)
      })
      console.log('addresses', addresses)
      setListOfAddresses(addresses)
    } else {
      setListOfAddresses([])
    }
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
    setaddAdrsDropdown('Insert Manually')
    setListOfAddresses(addresses)
  }

  const handleError = () => {
    setAddressError([])

    listOfAddresses?.forEach((item: any, i: any, listOfAddresses: any) => {
      console.log('item.adrs', item.adrs)
      if (!ethers.utils.isAddress(item.adrs))
        setAddressError((prevArray: any) => [
          ...prevArray,
          {
            line: item.line,
            error: `${item.adrs} is invalid address`,
          },
        ])
      if (item.value <= 0 || isNaN(item.value))
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

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      setLineNumbers([...lineNumbers, Number(lineNumbers.length + 1)])
    }
  }

  const handleSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    setaddAdrsDropdown(event.target.value as string)
  }

  console.log('status', status)

  return (
    <section>
      <AlertSnackbar
        open={showWarning}
        title={'Wrong Network'}
        subTitle={`You are not wrong network`}
      />
      <div className={'row_spaceBetween_center marginB8'}>
        <div style={{ flex: 9, marginRight: '32px' }}>
          <TextWrapper
            text={'Token'}
            fontWeight={300}
            fontSize={14}
            lineHeight={'140%'}
            Fcolor={'rgba(255, 255, 255, 0.88)'}
          />
        </div>
        <div style={{ flex: 1 }}>
          <TextWrapper
            text={'Decimal'}
            fontWeight={300}
            fontSize={14}
            lineHeight={'140%'}
            Fcolor={'rgba(255, 255, 255, 0.88)'}
          />
        </div>
      </div>
      <div className={'row_spaceBetween_center marginB24'}>
        <div style={{ flex: 9, marginRight: '32px' }}>
          <Autocomplete
            loading={true}
            value={selectedToken}
            inputValue={tokenInputValue}
            onChange={async (e, token) => {
              console.log('token', token)
              if (
                tokenInputValue.length > 0 &&
                ethers.utils.isAddress(tokenInputValue)
              ) {
                console.log('mainif')
                if (ethers.utils.isAddress(token?.address)) {
                  const contractOfToken = new Contract(
                    token?.address,
                    ABIS['IERC20'],
                    core.provider,
                  )
                  if (
                    (await contractOfToken?.provider.getNetwork()).chainId !==
                    chainId
                  ) {
                    setShowWarning(true)
                  } else {
                    const decimal = await contractOfToken?.decimals()
                    const symbol = await contractOfToken?.symbol()
                    setSelectedToken(
                      new ERC20(token.address, core.provider, symbol, decimal),
                    )
                    setTokenInputValue(`${symbol} - ${tokenInputValue}`)
                    setStringTokens(
                      _.uniq([
                        ...stringTokens,
                        { address: token.address, symbol, decimal },
                      ]),
                    )
                  }
                }
              } else if (token && typeof token?.address === 'string') {
                console.log('else if')
                setSelectedToken(
                  new ERC20(
                    token.address,
                    core.provider,
                    token.symbol,
                    token.decimal,
                  ),
                )
              } else {
                console.log('neither input value nor token')
              }
            }}
            onInputChange={(e, val) => setTokenInputValue(val)}
            filterOptions={(options, params) => {
              const filtered = filter(options, params)
              // Suggest the creation of a new value
              if (params.inputValue !== '') {
                filtered.push({
                  address: params.inputValue,
                  symbol: '',
                  decimal: '',
                })
              }

              return filtered
              // return filterTokenHandler(options, params)
            }}
            id="combo-box-demo"
            options={stringTokens}
            getOptionLabel={(option: any) => {
              if (option.symbol.length > 0)
                return `${option.symbol} - ${option.address}`
              return `${option.address}`
            }}
            getOptionSelected={(option, value) =>
              option.address === value.address
            }
            style={{ width: '100%', color: '#fff' }}
            freeSolo
            selectOnFocus
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
              value={selectedToken?.decimal || 0}
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                'aria-label': 'weight',
              }}
              labelWidth={0}
              className={'white_text'}
              disabled={true}
            />
          </FormControl>
        </div>
      </div>
      <div className={'row_spaceBetween_center marginB8'}>
        <div style={{ flex: 2 }}>
          <TextWrapper
            text={'Give addresses with Amounts'}
            fontWeight={300}
            fontSize={14}
            lineHeight={'140%'}
            Fcolor={'rgba(255, 255, 255, 0.88)'}
          />
        </div>
        <div>
          <FormControl>
            <Select
              labelId="demo-customized-select-label"
              id="demo-customized-select"
              value={addAdrsDropdown}
              onChange={handleSelect}
              input={<BootstrapInput />}
              defaultValue={'Insert Manually'}
            >
              <MenuItem value={'Insert Manually'}>Insert Manually</MenuItem>
              <MenuItem value={'Upload File'}>Upload File</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <UploadFileContainer>
        {addAdrsDropdown === 'Upload File' ? (
          <div>
            <ImportCSV listOfAddresses={handleCSVData} />
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              overflowY: 'scroll',
              height: '150px',
            }}
          >
            <div style={{ marginRight: '10px', height: '100%' }}>
              {lineNumbers?.map((item: any, i: number) => (
                <div>
                  <TextWrapper
                    key={i}
                    text={`${item}`}
                    fontFamily={'Inter'}
                    fontWeight={300}
                    fontSize={14}
                    lineHeight={'140%'}
                    Fcolor={'rgba(255, 255, 255, 0.88)'}
                    className={'marginTB2'}
                  />
                </div>
              ))}
            </div>
            <textarea
              rows={lineNumbers?.length || 2}
              value={enteredAdrs}
              onChange={(e) => {
                setEnteredAdrs(e.target.value)
              }}
              onBlur={handleManualData}
              onKeyDown={handleKeyDown}
              onPaste={handleManualData}
              className={'scroll'}
              placeholder={
                'Insert address and amount separated by a comma \ne.g. 0x3bd31a863a799cf0ef9f6d678a8c39a1f8af0a9b,0.1'
              }
            />
          </div>
        )}
      </UploadFileContainer>
      <div className={'row_spaceBetween_center marginB42'}>
        <TextWrapper
          text={'Accepted files : CSV, Excel, TXT'}
          fontWeight={300}
          fontSize={14}
          lineHeight={'140%'}
          Fcolor={'rgba(255, 255, 255, 0.88)'}
        />

        <CsvDownloader
          filename="sample_mahasender"
          extension=".csv"
          datas={[
            {
              addresses: '0x3bd31a863a799cf0ef9f6d678a8c39a1f8af0a9b',
              values: '4',
            },
            {
              addresses: '0x99898f3fd648b42ed2ab48a7dd556cbf7b15ef93',
              values: '2',
            },
          ]}
          className={'flex_row_start_center pointer'}
        >
          <TextWrapper
            text={'Sample file'}
            fontWeight={300}
            fontSize={14}
            lineHeight={'140%'}
            Fcolor={'rgba(255, 255, 255, 0.88)'}
            className={'marginR4'}
          />
          <IconLoader
            iconName={'DownloadIcon'}
            iconType={'misc'}
            className="m-r-8"
          />
        </CsvDownloader>
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
        onClick={() => handleNext(listOfAddresses)}
        disabled={!disableNextBtn}
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
