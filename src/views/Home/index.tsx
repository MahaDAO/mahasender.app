import React, { useEffect, useState } from 'react'
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

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient(18.44deg, #F47F57 5.81%, #b63b3b 97.57%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient(18.44deg, #F47F57 5.81%, #b63b3b 97.57%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#c9c9ce',
    borderRadius: 1,
  },
})(StepConnector)

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#9c9a9a',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient(38.44deg, #F47F57 15.81%, #FD5656 87.57%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient(38.44deg, #F47F57 15.81%, #FD5656 87.57%)',
  },
})

function ColorlibStepIcon(props: StepIconProps) {
  const classes = useColorlibStepIconStyles()
  const { active, completed } = props

  const icons: { [index: string]: React.ReactElement } = {
    1: <ExtensionIcon />,
    2: <CheckCircleIcon />,
    3: <ThumbUpIcon />,
    4: <SendIcon />,
  }

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  )
}

function getSteps() {
  return ['Prepare', 'Approve', 'Confirm', 'Send']
}

export default function Home() {
  const [activeStep, setActiveStep] = React.useState(0)
  const [amountRadio, setAmountRadio] = useState<string>('0')
  const steps = getSteps()

  const handleAmountRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmountRadio((event.target as HTMLInputElement).value)
  }

  const handleNext = () => {
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

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <Prepare handleNext={handleNext} />
      case 1:
        return <Approve handleNext={handleNext} handleBack={handleBack} />
      case 2:
        return <Confirm handleNext={handleNext} handleBack={handleBack} />
      case 3:
        return <Send handleBack={handleBack} />
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

const StpperContent = styled.div`
  padding: 24px 50px;
`

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
