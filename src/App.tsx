import React, { useEffect, useState } from 'react'
import { UseWalletProvider } from 'use-wallet'
import { useMediaQuery } from 'react-responsive'
import { HashRouter as Router } from 'react-router-dom'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import FormControl from '@material-ui/core/FormControl'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import Navbar from './components/Navbar'
import config from './config'
import Home from './views/Home'
import NoMetamaskNotice from './components/NoMetamaskNotice'
import useCore from './hooks/useCore'
import styled from 'styled-components'
import TextWrapper from './components/TextWrapper'
import HeadingBgDesign from './assets/images/HeadingBgDesign.png'
import SelectOption from './components/SelectOptiion'
import UploadIcon from './assets/icons/misc/UploadIcon.svg'
import Button from './components/Button'

const Providers: React.FC = ({ children }) => {
  return (
    <UseWalletProvider
      // chainId={config.chainId}
      // connectors={{ injected: {} }}
      connectors={{ injected: { chainId: [97] } }}
    >
      {children}
    </UseWalletProvider>
  )
}

export let isMobileGlobal = false

const App: React.FC = () => {
  const core = useCore()
  const isMobile = useMediaQuery({ maxWidth: '600px' })
  isMobileGlobal = isMobile

  const [decimalText, setDeciamText] = useState<string>('18')
  const [amountRadio, setAmountRadio] = useState('Exact amount to be sent')

  const handleAmountRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmountRadio((event.target as HTMLInputElement).value)
  }

  useEffect(() => {
    // @ts-ignore
    if (window.ethereum)
      // @ts-ignore
      window.ethereum.on('chainChanged', (chainId) => {
        window.location.reload()
      })
  }, [])

  if (!window.ethereum) return <NoMetamaskNotice />
  if (!core) return <div />

  return (
    <Providers>
      <Router>
        <Navbar />
        <div className={'container'}>{/* <Home /> */}</div>
        <img
          src={HeadingBgDesign}
          alt={'HeadingBgDesign'}
          style={{
            width: '-webkit-fill-available',
            position: 'absolute',
            top: '-40px',
          }}
        />

        <HeadingContainer>
          <TextWrapper
            text={'Bulk send tokens instantly with zero commission'}
            fontWeight={'bold'}
            fontSize={42}
            lineHeight={'44px'}
            align={'center'}
            fontFamily={'Syne'}
            className={'margin0'}
          />
          <TextWrapper
            text={'The fast and most secure way to bulk send token'}
            fontWeight={400}
            fontSize={18}
            lineHeight={'24px'}
            align={'center'}
            fontFamily={'Syne'}
            Fcolor={'rgba(255, 255, 255, 0.64)'}
          />
        </HeadingContainer>
        <StepCard>
          <div className={'flex_row marginB6'}>
            <div
              style={{
                width: '139px',
                height: '4px',
                backgroundColor: '#FF7F57',
                borderRadius: '100px',
                marginRight: '4px',
              }}
            ></div>
            <div
              style={{
                width: '139px',
                height: '4px',
                backgroundColor: '#FF7F57',
                borderRadius: '100px',
                marginRight: '4px',
              }}
            ></div>
            <div
              style={{
                width: '139px',
                height: '4px',
                backgroundColor: '#FF7F57',
                borderRadius: '100px',
                marginRight: '4px',
              }}
            ></div>
            <div
              style={{
                width: '139px',
                height: '4px',
                backgroundColor: '#FF7F57',
                borderRadius: '100px',
              }}
            ></div>
          </div>
          {/* <div className={'flex_row marginB42'}>test</div> */}
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={amountRadio}
              onChange={handleAmountRadio}
              className={'flex_row marginB42'}
            >
              <div
                style={{
                  width: '139px',
                  borderRadius: '100px',
                  marginRight: '4px',
                }}
              >
                <FormControlLabel
                  value="exactAmt"
                  control={<Radio />}
                  label="Prepare"
                />
              </div>
              <div
                style={{
                  width: '139px',
                  borderRadius: '100px',
                  marginRight: '4px',
                }}
              >
                <FormControlLabel
                  value="fullTokenBalance"
                  control={<Radio />}
                  label="Approve"
                />
              </div>
              <div
                style={{
                  width: '139px',
                  borderRadius: '100px',
                  marginRight: '2px',
                }}
              >
                <FormControlLabel
                  value="fullTokenBalance"
                  control={<Radio />}
                  label="Confirm"
                />
              </div>
              <div
                style={{
                  width: '139px',
                  borderRadius: '100px',
                  marginRight: '2px',
                }}
              >
                <FormControlLabel
                  value="fullTokenBalance"
                  control={<Radio />}
                  label="Send"
                />
              </div>
            </RadioGroup>
          </FormControl>
          <div className={'divider marginB42'}></div>
          <div className={'row_spaceBetween_center marginB8'}>
            <div>Token</div>
            <div>Decimal</div>
          </div>
          <div className={'row_spaceBetween_center marginB24'}>
            <div style={{ flex: 9, marginRight: '32px' }}>
              <SelectOption />
            </div>
            <div style={{ flex: 1 }}>
              <FormControl
                style={{
                  backgroundColor: '#151414',
                  borderRadius: '5px',
                }}
              >
                <OutlinedInput
                  id="outlined-adornment-weight"
                  value={decimalText}
                  onChange={(e) => {
                    setDeciamText(e.target.value)
                  }}
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                  labelWidth={0}
                  className={'white_text'}
                />
              </FormControl>
            </div>
          </div>
          <div className={'row_spaceBetween_center marginB8'}>
            <div>Give addresses with Amounts</div>
            <div></div>
          </div>
          <UploadFileContainer>
            <img src={UploadIcon} alt={'UploadIcon'} />
            <TextWrapper text={'drag and drop file here or click to upload'} />
          </UploadFileContainer>
          <div className={'row_spaceBetween_center marginB42'}>
            <div>Accepted files : CSV, Excel, TXT</div>
            <div>Sample file</div>
          </div>
          <Button text={'Next'} onClick={() => {}} />
        </StepCard>
      </Router>
    </Providers>
  )
}

export default App

// if (isProduction) console.log = function () { };

const HeadingContainer = styled.div`
  margin: 70px 290px 124px 290px;
`

const StepCard = styled.div`
  margin: 0 396px 64px 396px;
  background: linear-gradient(180deg, #48423e 0%, #373030 100%);
  border-radius: 6px;
  padding: 40px;
`

const UploadFileContainer = styled.div`
  background: #151414;
  border-radius: 6px;
  width: 100%;
  padding: 80px 151px;
  text-align: center;
  margin-bottom: 6px;
`
