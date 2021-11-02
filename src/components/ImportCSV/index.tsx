import React, { useState } from 'react'
import * as XLSX from 'xlsx'

import UploadIcon from '../../assets/icons/Upload.svg'
import { UploadingModal } from './modal/UploadingModal'
import CustomSuccessModal from '../CustomSuccessModal'

interface Iprops {
  // type: 'investors'
  onError?: () => void
  errorData?: (data: any) => void
  content?: any
}

const ImportCSV = (props: Iprops) => {
  const { onError, errorData, content } = props

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
      setUploadedAdrs(dataParse)
      console.log('dataParse', dataParse)
    }

    setSelectedFile(formData)
    setTimeout(() => {
      setUploadFileModal(true)
      reader.readAsBinaryString(formData)
    }, 1000)
  }

  console.log('uploadedAdrs', uploadedAdrs)

  const sendCsv = () => {
    const formData = new FormData()
    formData.append('file', selectedFile, selectedFile.name)
  }

  return (
    <>
      <div
        onClick={() => handleClick()}
        className="flex_row_center_start pointer"
      >
        {content ? (
          content()
        ) : (
          <div>
            Upload file
            <img
              src={UploadIcon}
              alt={'download'}
              height={18}
              className="marginL04 "
            />
          </div>
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
