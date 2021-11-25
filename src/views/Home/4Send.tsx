import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import TextWrapper from '../../components/TextWrapper'
import Button from '../../components/Button'
import WhiteSquare from '../../assets/icons/checkbox/WhiteSquare.svg'
import Cross from '../../assets/icons/misc/Cross.svg'
import GreenOutline from '../../assets/icons/checkbox/GreenOutline.svg'
interface SendProps {
  txHashes: string[]
  handleBack: () => void
}

export default function Send(props: SendProps) {
  const { handleBack, txHashes } = props

  const [txConfirmed, setTxConfirmed] = useState<boolean>(true)
  const [txMined, setTxMined] = useState(false)

  console.log('HERE', txHashes)
  return (
    <section>
      {txMined ? (
        <SuccessAlert>
          <div className={'marginR12'}>
            <img src={WhiteSquare} alt={'WhiteSquare'} />
          </div>
          <div style={{ flex: 1 }}>
            <TextWrapper
              text={
                'Congratulations! your transactions were sent out successfully.'
              }
              fontSize={16}
              lineHeight={'150%'}
              className={'margin0'}
            />
          </div>
          <div onClick={() => setTxMined(false)} className={'pointer'}>
            <img src={Cross} alt={'Cross'} />
          </div>
        </SuccessAlert>
      ) : null}

      {!txConfirmed ? (
        <TextWrapper
          text={'Please confirm the transaction in metamask.'}
          className={'marginB220 margin0'}
          fontWeight={600}
          fontSize={14}
          lineHeight={'20px'}
          Fcolor={'rgba(255, 255, 255, 0.88)'}
          align={'center'}
        />
      ) : (
        <div>
          <TextWrapper
            text={
              'Transactions were sent out. Now wait until all the transactions are mined.'
            }
            className={'margin0 marginB12'}
            fontWeight={600}
            fontSize={14}
            lineHeight={'20px'}
            Fcolor={'rgba(255, 255, 255, 0.88)'}
          />
          <TxnHashDiv>
            <div>
              <TextWrapper
                text={'1. 0x7a...51f16'}
                fontWeight={300}
                fontSize={14}
                lineHeight={'130%'}
                className={'margin0'}
              />
            </div>
            <div>
              <img src={GreenOutline} alt={'GreenCheck'} />
              {/* <TextWrapper
                text={'loader'}
                fontWeight={300}
                fontSize={14}
                lineHeight={'130%'}
                className={'margin0'}
              /> */}
            </div>
          </TxnHashDiv>
          <TxnHashDiv style={{ marginBottom: '40px' }}>
            <div>
              <TextWrapper
                text={'1. 0x7a...51f16'}
                fontWeight={300}
                fontSize={14}
                lineHeight={'130%'}
                className={'margin0'}
              />
            </div>
            <div>
              <TextWrapper
                text={'loader'}
                fontWeight={300}
                fontSize={14}
                lineHeight={'130%'}
                className={'margin0'}
              />
            </div>
          </TxnHashDiv>
        </div>
      )}

      <Button
        text={'Back'}
        variant={'outlined'}
        onClick={() => {
          handleBack()
        }}
      />
    </section>
  )
}

const TxnHashDiv = styled.div`
  padding: 12px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`

const SuccessAlert = styled.div`
  background: #178a50;
  border: 1px solid #88e0b4;
  border-radius: 6px;
  display: flex;
  align-items: center;
  padding: 18px;
  position: fixed;
  top: 100px;
  left: 25%;
  width: 728px;
`
