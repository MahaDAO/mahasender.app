import React from 'react'
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

import Prepare from './components/Prepare'
import styled from 'styled-components'

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

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <Prepare />
    case 1:
      return 'Approve'
    case 2:
      return 'Confirm'
    case 3:
      return 'Send'
    default:
      return 'Unknown step'
  }
}

export default function Home() {
  const [activeStep, setActiveStep] = React.useState(0)
  const steps = getSteps()

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <div>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
        className={'bg_443E3A'}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className={'divider'}></div>
      <StpperContent className={'bg_443E3A'}>
        {activeStep === steps.length ? (
          <div>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} className={'white_text'}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <Typography>{getStepContent(activeStep)}</Typography>
            <div className={'row_spaceBetween_center'}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={'white_text'}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                className={'btn_outlined'}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </StpperContent>
    </div>
  )
}

const StpperContent = styled.div`
  padding: 24px 50px;
`
