import React, { useState } from 'react'
import * as XLSX from 'xlsx'
import styled from 'styled-components'

import { UploadingModal } from './modal/UploadingModal'
import CustomSuccessModal from '../CustomSuccessModal'
import TextWrapper from '../../components/TextWrapper'
import UploadIcon from '../../assets/icons/misc/UploadIcon.svg'

interface Iprops {
  // type: 'investors'
  // onError?: () => void
  // errorData?: (data: any) => void
  listOfAddresses?: (items: any) => void
  content?: any
}

const ImportCSV = (props: Iprops) => {
  const { content, listOfAddresses } = props

  const [selectedFile, setSelectedFile] = useState<any>(null)
  const [uploadFileModal, setUploadFileModal] = useState<boolean>(false)
  const [successModal, setSuccessModal] = useState<boolean>(false)
  const [uploadedAdrs, setUploadedAdrs] = useState<any>()

  const hiddenFileInput = React.useRef(null)

  const handleClick = () => {
    //@ts-ignore
    hiddenFileInput?.current?.click()
    console.log('hiddenFileInput', hiddenFileInput)
  }

  const handleChange = async (event: any) => {
    // const fileUploaded = event.target.files[0]

    // const formData = await new FormData()
    // await formData.append('file', fileUploaded)

    // console.log('formData', formData, fileUploaded)
    var formData = event.target.files[0]
    var reader = new FileReader()
    reader.onload = async function (e: any) {
      var data = e.target.result
      let readedData = XLSX.read(data, { type: 'binary' })
      const wsname = readedData.SheetNames[0]
      const ws = readedData.Sheets[wsname]

      /* Convert array to json*/
      const dataParse = await XLSX.utils.sheet_to_json(ws, { header: 1 })
      const textData = await XLSX.utils.sheet_to_txt(ws)

      let list = await dataParse.map((item: any) => {
        item.toString()
      })

      console.log('list', list)

      console.log('dataParse', dataParse)
      // console.log('textData', textData)
      // listOfAddresses(list)
    }

    setSelectedFile(formData)
    setTimeout(() => {
      setUploadFileModal(true)
      reader.readAsBinaryString(formData)
    }, 1000)
  }

  const sendCsv = () => {
    const formData = new FormData()
    formData.append('file', selectedFile, selectedFile.name)
  }

  return (
    <>
      <div
        onClick={() => handleClick()}
        className="flex_row_start_center pointer"
      >
        {content ? (
          content()
        ) : (
          <Dropfile className="text_center">
            <img src={UploadIcon} alt={'UploadIcon'} />
            <TextWrapper
              text={'drag and drop file here or click to upload'}
              align={'center'}
            />
          </Dropfile>
        )}
        <input
          type="file"
          ref={hiddenFileInput}
          onChange={handleChange}
          style={{ display: 'none' }}
          accept=".xls, .xlsx, .csv, .txt"
        />
      </div>
      {/* <UploadingModal
        openModal={uploadFileModal}
        onClose={() => setUploadFileModal(false)}
        onSuccess={() => {
          setUploadFileModal(false)
          setSuccessModal(true)
          window.location.reload()
        }}
        onError={() => {
          onError()
          setUploadFileModal(false)
          console.log('importCSV onError')
        }}
        data={selectedFile}
        errorData={(data) => {
          errorData(data)
        }}
      /> */}
      {/* <CustomSuccessModal
        modalOpen={successModal}
        setModalOpen={() => {
          window.location.reload()
          setSuccessModal(false)
        }}
        title={
          'Your file is uploaded you can now track your investors investments'
        }
      /> */}
    </>
  )
}

export default ImportCSV

const Dropfile = styled.div`
  padding: 20px;
  background-color: #151414;
  color: #fff;
  text-align: center;
  margin: 0 auto;
`
