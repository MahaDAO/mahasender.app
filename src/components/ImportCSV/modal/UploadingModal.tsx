import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'
import Loader from 'react-spinners/BeatLoader'

import CustomModal from '../../CustomModal'
import TextWrapper from '../../TextWrapper'
// import { importInvestorsData } from '../../../_helpers/serverApi'

interface IPorps {
  openModal: boolean
  onClose: () => void
  onSuccess: () => void
  onError: () => void
  data: any
  errorData: (data: any) => void
}

const UploadingModal = (props: IPorps) => {
  var { openModal, onSuccess, onClose, data, onError, errorData } = props

  useEffect(() => {
    if (openModal) {
      var reader = new FileReader()
      reader.onload = function (e: any) {
        var data = e.target.result
        let readedData = XLSX.read(data, { type: 'binary' })
        const wsname = readedData.SheetNames[0]
        const ws = readedData.Sheets[wsname]

        /* Convert array to json*/
        const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 })
        console.log('dataParse', dataParse)
      }
    }
  }, [openModal])

  //   useEffect(() => {
  //     if (openModal) {
  //       importInvestorsData(data)
  //         .then((data) => {
  //           console.log('importInvestorsData', data)
  //           if (data?.success) {
  //             onSuccess()
  //             console.log('data uploadmodal', data)
  //           }
  //           if (data?.error) {
  //             console.log('data?.error', data?.error)
  //             errorData(data?.error)
  //             onError()
  //           }
  //         })
  //         .catch((error) => {
  //           console.log('error importInvestorsData', error)
  //           // alert('Internal Server Error');
  //         })
  //         .finally(() => {})
  //     }
  //   }, [openModal])

  return (
    <CustomModal
      handleClose={() => {}}
      open={openModal}
      modalTitleStyle={{}}
      modalContainerStyle={{}}
      modalBodyStyle={{}}
      title={`Import Investors by CSV`}
    >
      <div className="text_center">
        <Loader color={'#ffffff'} loading={true} size={12} margin={2} />
        <TextWrapper
          text={`Please wait few minutes while file is uploading.`}
          //   Fmargin={'12px 0 0 0'}
        />
      </div>
    </CustomModal>
  )
}

export { UploadingModal }
