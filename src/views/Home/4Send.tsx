import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import TextWrapper from '../../components/TextWrapper'
import Button from '../../components/Button'

interface SendProps {
  handleBack: () => void
}

export default function Send(props: SendProps) {
  const { handleBack } = props

  const [txConfirmed, setTxConfirmed] = useState<boolean>(true)
  return (
    <section>
      <SuccessAlert>
        <div className={'marginR12'}>i</div>
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
        <div>i</div>
      </SuccessAlert>
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
              <TextWrapper
                text={'loader'}
                fontWeight={300}
                fontSize={14}
                lineHeight={'130%'}
                className={'margin0'}
              />
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
