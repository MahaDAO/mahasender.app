import styled from 'styled-components'
import { useWallet } from 'use-wallet'

export default function Navbar() {
  const { account, connect } = useWallet()

  return (
    <NavbarContainer className="container">
      <div>Logo</div>
      <div>
        {!account ? (
          <button
            className="btn_outlined"
            onClick={() => {
              connect('injected')
                .then((res) => {
                  console.log('res', res)
                  localStorage.removeItem('disconnectWallet')
                })
                .catch((e) => {})
            }}
          >
            Connect Wallet
          </button>
        ) : null}
      </div>
    </NavbarContainer>
  )
}

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #131212;
`
