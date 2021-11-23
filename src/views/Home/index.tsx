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

import TextWrapper from '../../components/TextWrapper'
import HeadingBgDesign from '../../assets/images/HeadingBgDesign.png'
import Prepare from './1Prepare'
import Approve from './2Approve'
import Confirm from './3Confirm'
import Send from './4Send'
import { useWallet } from 'use-wallet'

function getSteps() {
  return ['Prepare', 'Approve', 'Confirm', 'Send']
}

export default function Home() {
  const { balance } = useWallet()
  const ethBalance = ethers.utils.formatEther(balance)

  const [activeStep, setActiveStep] = React.useState(0)
  const [amountRadio, setAmountRadio] = useState<string>('0')
  const [textAreaFields, setTextAreaFields] = useState<any>({
    noOfAdrs: 0,
    noOfTokens: 0,
    noOfTxns: 0,
    inSufficinetBal: false,
    selectedToken: {},
  })
  const [amountToApprove, setAmountToApprove] = useState<number>(0)

  const steps = getSteps()

  useEffect(() => {
    if (
      textAreaFields.noOfTokens > 0 &&
      textAreaFields.noOfTokens > Number(ethBalance)
    ) {
      setTextAreaFields({ ...textAreaFields, inSufficinetBal: true })
    } else setTextAreaFields({ ...textAreaFields, inSufficinetBal: false })
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
        noOfTxns: Math.ceil(adrs.length / 5),
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
          />
        )
      case 1:
        return (
          <Approve
            handleNext={handleNext}
            textAreaFields={textAreaFields}
            handleBack={handleBack}
            amountToApproveFn={(val: number) => setAmountToApprove(val)}
          />
        )
      case 2:
        return (
          <Confirm
            textAreaFields={textAreaFields}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        )
      case 3:
        return <Send handleBack={handleBack} />
      default:
        return 'Unknown step'
    }
  }

  console.log('activeStep', activeStep)

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
          {/* <img
          src={HeadingBgDesign}
          alt={'HeadingBgDesign'}
          style={{
            width: '-webkit-fill-available',
            position: 'absolute',
            top: '-40px',
          }}
        /> */}

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
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={amountRadio}
                onChange={handleAmountRadio}
                className={'flex_row marginB42'}
              >
                <RadioContainer>
                  <FormControlLabel
                    value={'0'}
                    control={
                      <Radio
                        className={`${
                          activeStep === 0 ? 'orange_text' : 'rgb256_064_text'
                        }`}
                      />
                    }
                    label="Prepare"
                  />
                </RadioContainer>
                <RadioContainer>
                  <FormControlLabel
                    value={'1'}
                    control={
                      <Radio
                        className={`${
                          activeStep === 1 ? 'orange_text' : 'rgb256_064_text'
                        }`}
                        disabled={activeStep === 0 || activeStep < 1}
                      />
                    }
                    label="Approve"
                  />
                </RadioContainer>
                <RadioContainer>
                  <FormControlLabel
                    value={'2'}
                    control={
                      <Radio
                        className={`${
                          activeStep === 2 ? 'orange_text' : 'rgb256_064_text'
                        }`}
                      />
                    }
                    label="Confirm"
                    disabled={activeStep === 1 || activeStep < 2}
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
  margin: 100px 290px 124px 290px;
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
