import { useState } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import { useMediaQuery } from 'react-responsive'

import AlertSnackbar from '../AlertSnackbar'
import ProductLogo from '../../assets/icons/brandLogo/ProductLogo.png'
import ProductMobLogo from '../../assets/icons/brandLogo/ProductMobLogo.svg'
import MobileLogo from '../../assets/icons/brandLogo/MobileLogo.svg'
import Button from '../Button'
import AccountButton from './components/AccountButton'
import IconLoader from '../IconLoader'
import MobileNav from './components/MobileNav'
import TxModal from './components/modal/Transaction/TxModal'

export default function Navbar() {
  const { account, connect, reset } = useWallet()

  const isMobile = useMediaQuery({ maxWidth: '600px' })

  const [showTxModal, setShowTxModal] = useState<boolean>(false)
  const [showMobileMenu, toggleMobileMenu] = useState(false)
  const [showWarning, setShowWarning] = useState<boolean>(false)

  return (
    <TopBarContainer>
      <TxModal
        openModal={showTxModal}
        onDismiss={() => setShowTxModal(false)}
      />
      {/* <AlertSnackbar
        open={showWarning}
        title={'Wrong Network!'}
        subTitle={`You are on the wrong network, switch/add ${core.config.networkName} Network to use the app.`}
      /> */}
      <StyledTopBar>
        <StyledTopBarInner>
          <HideonPhone>
            <div className="row_spaceBetween_center">
              <div
                className="dialog-class"
                onClick={() => (window.location.href = '/#/')}
              >
                <img src={ProductLogo} width={269} height={44} alt={'logo'} />
              </div>
              <div className="flex_row_center_start">
                {/* <div className={'marginR12'}>
                  <Button
                    onClick={() =>
                      window.open('https://gov.mahadao.com/#/MAHAXStaking')
                    }
                  >
                    Stake MAHA
                  </Button>
                </div> */}
                {!!account && (
                  <IconLoader
                    iconName={'Transaction'}
                    className={'pointer marginR12'}
                    onClick={() => setShowTxModal(true)}
                  />
                )}
                <AccountButton showWarning={showWarning} />
              </div>
            </div>
          </HideonPhone>
          <HideOnBigScreen>
            <div className="row_spaceBetween_center">
              <IconLoader
                iconName={!showMobileMenu ? 'Menu' : 'Cross'}
                onClick={() => toggleMobileMenu(!showMobileMenu)}
                className={'pointer'}
              />

              <div onClick={() => (window.location.href = '/#/')}>
                <img src={MobileLogo} width={180} height={44} alt={'logo'} />
              </div>

              {!!account && (
                <IconLoader
                  iconName={'Transaction'}
                  className={'pointer'}
                  onClick={() => setShowTxModal(true)}
                />
              )}
            </div>
          </HideOnBigScreen>
          <HideOnBigScreen>
            <MobileNav
              openMenu={showMobileMenu}
              showWarning={showWarning}
              isMainnet={true}
              onClick={() => toggleMobileMenu(!showMobileMenu)}
              onWalletClick={() => {}}
            />
          </HideOnBigScreen>
        </StyledTopBarInner>
      </StyledTopBar>
    </TopBarContainer>
  )
}

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #131212;
  padding: 18px 60px;
`
const TopBarContainer = styled.div`
  position: fixed;
  z-index: 100;
  display: flex;
  flex-direction: column;
  width: 100%;
  top: 0;
`

const HideonPhone = styled.div`
  width: 100%;
  display: block;
  @media (max-width: 600px) {
    display: none;
  }
`

const HideOnBigScreen = styled.div`
  width: 100%;
  display: none;
  @media (max-width: 600px) {
    display: block;
  }
`

const StyledTopBar = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  width: 100%;
  background: rgba(0, 0, 0);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
`

const StyledTopBarInner = styled.div`
  align-content: center;
  display: flex;
  height: 72px;
  justify-content: space-between;
  width: 100%;
  padding: 0 60px;
  flex-wrap: wrap;
  @media (max-width: 600px) {
    padding: 0 16px;
  }
`
