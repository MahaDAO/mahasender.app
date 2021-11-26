import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import TextWrapper from '../../components/TextWrapper'
import Button from '../../components/Button'
import WhiteSquare from '../../assets/icons/checkbox/WhiteSquare.svg'
import Cross from '../../assets/icons/misc/Cross.svg'
import GreenOutline from '../../assets/icons/checkbox/GreenOutline.svg'
import { useAllTransactions } from '../../state/transactions/hooks'
import { truncateMiddle } from '../../utils'
import IconLoader from '../../components/IconLoader'
interface SendProps {
  txHashes: string[]
  handleBack: () => void
}

export default function Send(props: SendProps) {
  const { handleBack, txHashes } = props
  const allTransactions = useAllTransactions()

  const [txConfirmed, setTxConfirmed] = useState<boolean>(true)
  const [txMined, setTxMined] = useState<boolean>(false)

  // const transactionData = () => {
  //   Object.keys(allTransactions)?.map((key: any, i: number, txns) => {
  //     const summary = allTransactions[key].summary
  //     const pending = !allTransactions[key].receipt
  //     const success =
  //       !pending &&
  //       allTransactions[key] &&
  //       (allTransactions[key].receipt?.status === 1 ||
  //         typeof allTransactions[key].receipt?.status === 'undefined')

  //     console.log('txns.length', txns.length - 1, i, success)

  //     if (i === txns.length - 1 && success) {
  //       console.log('last')
  //       // setTxMined(true)
  //     }

  //     return (
  //       <TxnHashDiv>
  //         <div>
  //           <TextWrapper
  //             text={`${truncateMiddle(allTransactions[key].hash, 12, '...')}`}
  //             fontWeight={300}
  //             fontSize={14}
  //             lineHeight={'130%'}
  //           />
  //         </div>

  //         <IconWrapper pending={pending} success={success}>
  //           {pending ? (
  //             <IconLoader iconName={'ColoredPending'} iconType={'status'} />
  //           ) : success ? (
  //             <IconLoader iconName={'ColoredSuccess'} iconType={'status'} />
  //           ) : (
  //             <IconLoader iconName={'ColoredAlert'} iconType={'status'} />
  //           )}
  //         </IconWrapper>
  //       </TxnHashDiv>
  //     )
  //   })
  // }

  console.log('HERE', txHashes)
  console.log('Object.keys(allTransactions)', Object.keys(allTransactions))
  console.log('txMined', txMined)
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
          className={'marginB220'}
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
            className={'marginB12'}
            fontWeight={600}
            fontSize={14}
            lineHeight={'20px'}
            Fcolor={'rgba(255, 255, 255, 0.88)'}
          />

          {Object.keys(allTransactions)?.map((key: any, i: number, txns) => {
            const summary = allTransactions[key].summary
            const pending = !allTransactions[key].receipt
            const success =
              !pending &&
              allTransactions[key] &&
              (allTransactions[key].receipt?.status === 1 ||
                typeof allTransactions[key].receipt?.status === 'undefined')

            console.log('txns.length', txns.length - 1, i, success)

            if (i === txns.length - 1 && success) {
              console.log('last')
              // setTxMined(true)
            }

            return (
              <TxnHashDiv>
                <div>
                  <TextWrapper
                    text={`${truncateMiddle(
                      allTransactions[key].hash,
                      12,
                      '...',
                    )}`}
                    fontWeight={300}
                    fontSize={14}
                    lineHeight={'130%'}
                  />
                </div>

                <IconWrapper pending={pending} success={success}>
                  {pending ? (
                    <IconLoader
                      iconName={'ColoredPending'}
                      iconType={'status'}
                    />
                  ) : success ? (
                    <IconLoader
                      iconName={'ColoredSuccess'}
                      iconType={'status'}
                    />
                  ) : (
                    <IconLoader iconName={'ColoredAlert'} iconType={'status'} />
                  )}
                </IconWrapper>
              </TxnHashDiv>
            )
          })}
        </div>
      )}

      <div className={'marginT40'}>
        <Button
          text={'Back'}
          variant={'outlined'}
          onClick={() => {
            handleBack()
          }}
        />
      </div>
    </section>
  )
}

const IconWrapper = styled.div<{ pending: boolean; success?: boolean }>`
  color: ${({ pending, success }) =>
    pending ? '#D74D26' : success ? '#178A50' : '#BA1E38'};
`

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
