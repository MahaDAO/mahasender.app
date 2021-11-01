import styled from 'styled-components'

export default function Send() {
  return (
    <section className="container bg_443E3A">
      <h3>Please sign the transaction on Metamask</h3>
      <h3>
        Transactions were sent out. Now wait until all the transactions were
        mined
      </h3>
      <TxnSection>
        <div className={'marginR20'}>1</div>
        <div style={{ flex: 1 }}>
          0x61837551968B5496c63EbCC82cBfE2C8e1Fe798c
        </div>
        <div>Icon</div>
      </TxnSection>

      <section
        className={'bg_primary padding20px white_text'}
        style={{ borderRadius: '5px' }}
      >
        Congratulations, your Mahasender transactions were sent out successfully
      </section>
    </section>
  )
}

const TxnSection = styled.section`
  display: flex;
  background-color: #151414;
  color: #fff;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
`
