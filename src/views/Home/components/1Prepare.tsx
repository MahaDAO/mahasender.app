import { useState, useEffect } from 'react'
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
  const [enteredAdrs, setEnteredAdrs] = useState<any>('')
  const [addressError, setAddressError] = useState<any>([])
  const [arrayOfNoOfLines, setArrayOfNoOfLines] = useState<number[]>()
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()

  // let addressError: string[]
  // addressError = []

  const runOnInput = async () => {
    let addresses = await enteredAdrs.split(/\n/g)
    console.log('addresses', addresses)
    addresses.map((item: any, i: number) => {
      let indexOfComma = item.indexOf(',')
      let valueTobeSent = item.slice(indexOfComma + 1, item.length)

      // if (listOfAddresses.includes(item)) console.log('true')
      setListOfAddresses((prevArray: any) => [
        ...prevArray,
        {
          line: i + 1,
          adrs: `${item.slice(0, indexOfComma)}`,
          value: `${valueTobeSent}`,
        },
      ])

      // listOfAddresses?.forEach((item: any, index: any) => {
      //   console.log('item', item)
      //   if (!ethers.utils.isAddress(item.adrs))
      //     addressError.push(`${item.adrs} is invalid Address`)

      //   if (item.value <= 0) addressError.push(`${item.value} is invalid value`)
      // })

      console.log('addressError', addressError)
    })
  }

  // useEffect(() => {
  //   runOnInput()
  // }, [enteredAdrs])

  const files = acceptedFiles?.map((file) => {
    return (
      <li key={file?.name}>
        {file?.name} - {file?.size} bytes
      </li>
    )
  })

  let noOfLines: number
  // let arrayOfNoOfLines: any[]
  // arrayOfNoOfLines = []

  let arrayOfAdrsValue = []

  let duplicates: any[]
  duplicates = []

  let duplicatesParents: any[]
  duplicatesParents = []

  const handleError = () => {
    listOfAddresses?.forEach((item: any, i: any, listOfAddresses: any) => {
      if (!ethers.utils.isAddress(item.adrs))
        setAddressError((prevArray: any) => [
          ...prevArray,
          `line ${item.line} : ${item.adrs} is invalid Address`,
        ])
      if (item.value <= 0)
        setAddressError((prevArray: any) => [
          ...prevArray,
          `line ${item.line} : ${item.value} is invalid value`,
        ])

      // compares only first with second not with rest

      // if (item.adrs === listOfAddresses[i + 1]?.adrs)
      //   setAddressError((prevArray: any) => [
      //     ...prevArray,
      //     `line ${item.line} and ${item.line + 1} : ${
      //       item.adrs
      //     } is duplicate Address`,
      //   ])
    })

    for (let i = 0; i < listOfAddresses.length; i++) {
      for (let j = 1; j < listOfAddresses.length; j++) {
        if (
          listOfAddresses[i].adrs !== listOfAddresses[j].adrs &&
          !duplicates.includes(listOfAddresses[j].adrs)
        ) {
          console.log('i', i, listOfAddresses[i], 'j', j, listOfAddresses[j])

          if (listOfAddresses[i].adrs === listOfAddresses[j].adrs) {
            duplicates.push({ index: j, adrs: listOfAddresses[j].adrs })
          }
        }
      }

      // duplicatesParents.push(duplicates)
      // duplicates = []
    }
    console.log('duplicatesParents', duplicatesParents, duplicates)
  }
  console.log('addressError', addressError)

  const handleValidate = async () => {
    let addresses = await enteredAdrs.split(/\n/g)
    addresses.map(async (item: any, i: number) => {
      let indexOfComma = item.indexOf(',')
      let valueTobeSent = item.slice(indexOfComma + 1, item.length)
      if (listOfAddresses.includes(item)) console.log('true')
      await setListOfAddresses((prevArray: any) => [
        ...prevArray,
        {
          line: i + 1,
          adrs: `${item.slice(0, indexOfComma)}`,
          value: `${valueTobeSent}`,
        },
      ])
    })
    // await setListOfAddresses(enteredAdrs.split(/\n/g))
    // noOfLines = listOfAddresses.length
    // let test = new Array(noOfLines).fill(0).map((e, i) => i + 1)
    // setArrayOfNoOfLines(test)
    // console.log('noOfLines', noOfLines, arrayOfNoOfLines, test)
  }

  // var arr = [2, 2, 3, 2, 7, 3]

  // let duplicates: any[]
  // duplicates = []

  // let duplicatesParents: any[]
  // duplicatesParents = []

  // let j = 0

  // for (let i = 1; i < arr.length; i++) {
  //   for (j = 1; j < arr.length; j++) {
  //     if (i !== j && !duplicates.includes(j)) {
  //       // console.log('not included', j)
  //       if (arr[i] === arr[j]) {
  //         duplicates.push(j)
  //         // console.log('duplicates', duplicates, j)
  //       }
  //     }
  //   }
  //   // duplicatesParents.push(duplicates)
  //   // duplicates = []
  // }

  console.log('enteredAdrs', enteredAdrs)

  // let test: any[]
  // test = []

  // listOfAddresses.map((item: any, i: number) => {
  //   i++
  //   // return { i, item }
  //   test.push(`${i} ${item}`)
  // })

  // console.log('test', test)

  // let testText = test?.map((item: any, i: any) => {
  //   return <div>{` ${item.i}  ${item.item}`}</div>
  // })

  // console.log('testText', testText)

  // console.log('duplicates', duplicates)

  // function showDupPos(arr) {

  // }
  // console.log(showDupPos(arr));

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
          {/* <FormControl className={'insertManuallyFormcontrol'}> */}

          <div
            style={{ display: 'flex', flexDirection: 'row' }}
            className={'white_text'}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {arrayOfNoOfLines?.map((item: number) => (
                <div key={item}>{item} &nbsp; &nbsp; </div>
              ))}
            </div>
            <div style={{ flex: 1 }}>
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
                // onPaste={handleValidate}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight',
                }}
                labelWidth={0}
                className={'white_text'}
                multiline
                rows={5}
                fullWidth
              />
            </div>
          </div>

          {/* </FormControl> */}

          {/* <ol>
            {listOfAddresses?.map((address: any) => (
              <li key={address}> {address} </li>
            ))}
          </ol> */}
          {addressError?.map((item: any, i: any) => (
            <p key={i}> {item} </p>
          ))}

          {/* {test} */}

          <br />
          <button onClick={handleValidate}>Test</button>
          <button onClick={handleError}>Error check</button>
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
