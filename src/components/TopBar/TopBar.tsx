import styled from 'styled-components'
import React, { useEffect, useState, useCallback } from 'react'
import { ChainUnsupportedError, useWallet } from 'use-wallet'
import detectEthereumProvider from '@metamask/detect-provider'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputBase from '@material-ui/core/InputBase'
import { BigNumber, utils } from 'ethers'

import useCore from '../../hooks/useCore'
import theme from '../../theme'
import IconLoader from '../IconLoader'
import AlertSnackbar from '../AlertSnackbar'
import MobileNav from './components/MobileNav'
import AccountButton from './components/AccountButton'
import TxModal from './components/modal/Transaction/TxModal'
// import config from '../../config'
import TextWrapper from '../TextWrapper'
import { useAddPopup } from '../../state/application/hooks'
import ProductLogo from '../../assets/icons/brandLogo/ProductLogo.png'

const TopBar: React.FC = () => {
  const core = useCore()
  const addPopup = useAddPopup()
  const { account, error, connect, ethereum } = useWallet()
  const [showMobileMenu, toggleMobileMenu] = useState(false)
  const [showTxModal, setShowTxModal] = useState<boolean>(false)
  const [showWarning, setShowWarning] = React.useState<boolean>(false)
  const [isHomePage, setIsHomePage] = useState<boolean>(false)
  const [networkName, setNetworkName] = useState<any>(
    utils.hexStripZeros(BigNumber.from(core.config.chainId).toHexString()),
  )

  if (!!window.ethereum) {
    window.ethereum.autoRefreshOnNetworkChange = false
  }

  useEffect(() => {
    if (!account) setShowWarning(true)
    else setShowWarning(false)
  }, [error, addPopup, account])

  useEffect(() => {
    setNetworkName(
      utils.hexStripZeros(BigNumber.from(core.config.chainId).toHexString()),
    )
  }, [core])

  useEffect(() => {
    switchMetamaskChain(networkName)
  }, [networkName])

  let walletChainId: any

  const processNetwork = useCallback(async () => {
    const provider: any = await detectEthereumProvider()

    if (!isHomePage) {
      if (provider) {
        const chainId = Number(
          await provider.request({ method: 'eth_chainId' }),
        )
        // setShowWarning(chainId !== core.config.chainId)
      }
    } else {
      setShowWarning(false)
    }
  }, [core, isHomePage])

  const switchMetamaskChain = (networkName: string) => {
    if (!ethereum?.request) return

    if (ethereum) {
      ethereum
        .request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: networkName }],
        })
        .then(() => {
          // window.location.reload()
          console.log('then switchMetamaskChain')
        })
        .catch((error: any) => {
          if (error.code === 4902) addNetworkToMetamask()
        })
    }
  }

  const addNetworkToMetamask = () => {
    if (!ethereum?.request) return
    if (ethereum) {
      ethereum
        .request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: utils.hexStripZeros(
                BigNumber.from(core.config.chainId).toHexString(),
              ),
              chainName: core.config.networkName,
              rpcUrls: [],
              iconUrls: [],
              blockExplorerUrls: [core.config.etherscanUrl],
              nativeCurrency: {
                name: core.config.blockchainTokenName,
                symbol: core.config.blockchainToken,
                decimals: core.config.blockchainTokenDecimals,
              },
            },
          ],
        })
        .then(() => {
          console.log('then addNetworkToMetamask')
          // window.location.reload()
        })
        .catch((error: any) => {
          if (error.code === 4001) {
            // EIP-1193 userRejectedRequest error.
            console.log('We cannot encrypt anything without the key.')
          }
        })
    }
  }

  const handleSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    setNetworkName(event.target.value as string)
  }

  useEffect(() => {
    processNetwork()
  }, [account, core, connect, processNetwork])

  return (
    <TopBarContainer>
      {showWarning && (
        <WarningMsg id={'WarningMsg'}>
          <div className={'row_all_center mo_single_line_column'}>
            <TextWrapper
              text={`Please make sure you are connected to the wallet.`}
              align={'center'}
            />
            {core.config.networkSetupDocLink && (
              <div onClick={() => window.open(core.config.networkSetupDocLink)}>
                <TextWrapper
                  text={'Check RPC details here.'}
                  Fcolor={theme.color.primary[300]}
                  className={'marginL4 pointer'}
                  align={'center'}
                />
              </div>
            )}
          </div>
        </WarningMsg>
      )}
      {
        <AlertSnackbar
          open={showWarning}
          title={'Connect to the wallet.'}
          subTitle={`Please make sure you are connected to a wallet.`}
        />
      }
      <StyledTopBar>
        <StyledTopBarInner>
          <HideonPhone>
            <div className="row_spaceBetween_center">
              <div className="row_all_center">
                <img src={ProductLogo} width={269} height={44} alt={'logo'} />
              </div>

              <div className="flex_row_start_center">
                <div className={'marginR20'}>
                  <FormControl>
                    <Select
                      labelId="demo-customized-select-label"
                      id="demo-customized-select"
                      value={networkName}
                      onChange={handleSelect}
                      // defaultValue={'Rinkeby'}
                    >
                      <MenuItem value={'0x4'}>Rinkeby</MenuItem>
                      <MenuItem value={'0x13881'}>Matic Mumbai</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                {!!account && (
                  <div>
                    <TxModal
                      openModal={showTxModal}
                      onDismiss={() => setShowTxModal(false)}
                    />
                    <IconLoader
                      iconName={'Transaction'}
                      className={'pointer marginR12'}
                      onClick={() => setShowTxModal(true)}
                    />
                  </div>
                )}
                <AccountButton />
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
              <IconLoader
                iconName={'Mahalendlg'}
                iconType={'brandLogo'}
                onClick={() => (window.location.href = '/#/')}
              />
              {!!account ? (
                <IconLoader
                  iconName={'Transaction'}
                  className={'pointer'}
                  onClick={() => setShowTxModal(true)}
                />
              ) : (
                <div></div>
              )}
            </div>
          </HideOnBigScreen>
          <HideOnBigScreen>
            <MobileNav
              openMenu={showMobileMenu}
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

const WarningMsg = styled.div`
  display: block;
  background-color: #2a2827;
  padding: 12px 16px;
  @media (max-width: 600px) {
    height: 75px;
  }
`

export default TopBar
