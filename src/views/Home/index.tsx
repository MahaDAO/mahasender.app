import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import styled from 'styled-components'
import {
  makeStyles,
  Theme,
  createStyles,
  withStyles,
} from '@material-ui/core/styles'
import clsx from 'clsx'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import SendIcon from '@material-ui/icons/Send'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ExtensionIcon from '@material-ui/icons/Extension'
import StepConnector from '@material-ui/core/StepConnector'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { StepIconProps } from '@material-ui/core/StepIcon'
import FormControl from '@material-ui/core/FormControl'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import useTokenBalance from '../../hooks/useTokenBalance'

import TextWrapper from '../../components/TextWrapper'
import HeadingBgDesign from '../../assets/images/HeadingBgDesign.png'
import Prepare from './1Prepare'
import Approve from './2Approve'
import Confirm from './3Confirm'
import Send from './4Send'
import { useWallet } from 'use-wallet'
import IconLoader from '../../components/IconLoader'

function getSteps() {
  return ['Prepare', 'Approve', 'Confirm', 'Send']
}

export default function Home() {
  const { balance } = useWallet()
  const ethBalance = ethers.utils.formatEther(balance)

  const [txHashes, setTxHashes] = useState<string[]>([])
  const [activeStep, setActiveStep] = React.useState(0)
  const [amountRadio, setAmountRadio] = useState<string>('0')
  const [textAreaFields, setTextAreaFields] = useState<any>({
    noOfAdrs: 0,
    noOfTokens: 0,
    noOfTxns: 0,
    inSufficientBal: false,
    selectedToken: {},
  })
  const [storedSelectedToken, setStoredSelectedToken] = useState<any>()
  const [storedEnteredAdrs, setStoredEnteredAdrs] = useState<string>('')

  const steps = getSteps()
  const tokenBalance = useTokenBalance(textAreaFields.selectedToken)

  useEffect(() => {
    if (
      textAreaFields.noOfTokens > 0 &&
      textAreaFields.noOfTokens > Number(tokenBalance.value.toString())
    ) {
      setTextAreaFields({ ...textAreaFields, inSufficientBal: true })
    } else setTextAreaFields({ ...textAreaFields, inSufficientBal: false })
  }, [textAreaFields.noOfTokens])

  const handleAmountRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmountRadio((event.target as HTMLInputElement).value)
  }

  const handleNext = (adrs?: []) => {
    if (adrs) {
      let totalOfTokens = 0
      adrs.forEach((item: any) => {
        totalOfTokens += Number(item.value)
      })

      setTextAreaFields({
        ...textAreaFields,
        noOfAdrs: adrs.length,
        noOfTxns: Math.ceil(adrs.length / 2),
        noOfTokens: totalOfTokens,
      })
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setTimeout(() => setAmountRadio(`${activeStep + 1}`), 200)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
    setTimeout(() => setAmountRadio(`${activeStep - 1}`), 200)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  console.log(
    'insuff',
    textAreaFields.noOfTokens,
    Number(tokenBalance.value.toString()),
  )

  console.log('textAreaFields', textAreaFields)

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <Prepare
            handleNext={handleNext}
            selectedTokenFn={(token: any) =>
              setTextAreaFields({ ...textAreaFields, selectedToken: token })
            }
            setTokenFn={(token: any) => setStoredSelectedToken(token)}
            setEnteredAdrsFn={(adrs: string) => setStoredEnteredAdrs(adrs)}
            storedSelectedToken={storedSelectedToken}
            storedEnteredAdrs={storedEnteredAdrs}
          />
        )
      case 1:
        return (
          <Approve
            handleNext={handleNext}
            textAreaFields={textAreaFields}
            handleBack={handleBack}
          />
        )
      case 2:
        return (
          <Confirm
            textAreaFields={textAreaFields}
            handleNext={handleNext}
            handleBack={handleBack}
            setTxHashes={setTxHashes}
            storedEnteredAdrs={storedEnteredAdrs}
          />
        )
      case 3:
        return <Send txHashes={txHashes} handleBack={handleBack} />
      default:
        return 'Unknown step'
    }
  }

  return (
    <div>
      {activeStep === steps.length ? (
        <div>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={'white_text'}>
            Reset
          </Button>
        </div>
      ) : (
        <div>
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
              className={'marginB16'}
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
              <ProgressDiv
                className={`marginR4 ${
                  activeStep === 0 ? 'orange_bg' : 'rgb256_008_bg'
                }`}
              ></ProgressDiv>
              <ProgressDiv
                className={`marginR4 ${
                  activeStep === 1 ? 'orange_bg' : 'rgb256_008_bg'
                }`}
              ></ProgressDiv>
              <ProgressDiv
                className={`marginR4 ${
                  activeStep === 2 ? 'orange_bg' : 'rgb256_008_bg'
                }`}
              ></ProgressDiv>
              <ProgressDiv
                className={`${
                  activeStep === 3 ? 'orange_bg' : 'rgb256_008_bg'
                }`}
              ></ProgressDiv>
            </div>
            <FormControl
              component="fieldset"
              style={{ boxSizing: 'border-box' }}
            >
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={amountRadio}
                onChange={handleAmountRadio}
                className={'flex_row marginB42'}
              >
                <RadioContainer
                  className={`${activeStep >= 1 ? 'marginT8' : ''}`}
                >
                  <FormControlLabel
                    value={'0'}
                    control={
                      activeStep >= 1 ? (
                        <IconLoader
                          iconName={'CompletedIcon'}
                          iconType={'misc'}
                          className={'marginR8'}
                        />
                      ) : (
                        <Radio
                          className={`${
                            activeStep === 0 ? 'orange_text' : 'rgb256_064_text'
                          }`}
                        />
                      )
                    }
                    className={`${
                      activeStep === 0 ? 'white_text' : 'rgb256_064_text'
                    }`}
                    label="Prepare"
                  />
                </RadioContainer>
                <RadioContainer
                  className={`${activeStep >= 2 ? 'marginT8' : ''}`}
                >
                  <FormControlLabel
                    value={'1'}
                    control={
                      activeStep >= 2 ? (
                        <IconLoader
                          iconName={'CompletedIcon'}
                          iconType={'misc'}
                          className={'marginR8'}
                        />
                      ) : (
                        <Radio
                          className={`${
                            activeStep === 1 ? 'orange_text' : 'rgb256_064_text'
                          }`}
                          disabled={activeStep === 0 || activeStep < 1}
                        />
                      )
                    }
                    label="Approve"
                    className={`${
                      activeStep === 1 ? 'white_text' : 'rgb256_064_text'
                    }`}
                  />
                </RadioContainer>
                <RadioContainer
                  className={`${activeStep >= 3 ? 'marginT8' : 'margin0'}`}
                >
                  <FormControlLabel
                    value={'2'}
                    control={
                      activeStep >= 3 ? (
                        <IconLoader
                          iconName={'CompletedIcon'}
                          iconType={'misc'}
                          className={'marginR8'}
                        />
                      ) : (
                        <Radio
                          className={`${
                            activeStep === 2 ? 'orange_text' : 'rgb256_064_text'
                          }`}
                        />
                      )
                    }
                    label="Confirm"
                    disabled={activeStep === 1 || activeStep < 2}
                    className={`${
                      activeStep === 2 ? 'white_text' : 'rgb256_064_text'
                    }`}
                  />
                </RadioContainer>
                <RadioContainer>
                  <FormControlLabel
                    value={'3'}
                    control={
                      <Radio
                        className={`${
                          activeStep === 3 ? 'orange_text' : 'rgb256_064_text'
                        }`}
                      />
                    }
                    label="Send"
                    disabled={activeStep === 2 || activeStep < 3}
                    className={`${
                      activeStep === 3 ? 'white_text' : 'rgb256_064_text'
                    }`}
                  />
                </RadioContainer>
              </RadioGroup>
            </FormControl>
            <div className={'divider marginB42'}></div>
            {getStepContent(activeStep)}
          </StepCard>
        </div>
      )}
    </div>
  )
}

const HeadingContainer = styled.div`
  margin: 150px 290px 124px 290px;
`

const StepCard = styled.div`
  margin: 0 396px 64px 396px;
  background: linear-gradient(180deg, #48423e 0%, #373030 100%);
  border-radius: 6px;
  padding: 40px;
`

const ProgressDiv = styled.div`
  width: 139px;
  height: 4px;
  border-radius: 100px;
`

const RadioContainer = styled.div`
  width: 139px;
  border-radius: 100px;
  /* margin-right: 4px; */
`
