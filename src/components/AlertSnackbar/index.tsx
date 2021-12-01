import styled from 'styled-components'
import Slide from '@material-ui/core/Slide'
import Snackbar from '@material-ui/core/Snackbar'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TransitionProps } from '@material-ui/core/transitions'

import theme from '../../theme'
import '../../customCss/Custom-Snackbar.css'

import IconLoader from '../IconLoader'
import TextWrapper from '../TextWrapper'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    '& > * + *': {},
  },
}))

interface Iprops {
  open: boolean
  handleCancel?: () => void
  title?: string
  subTitle?: string
  type?: 'alert' | 'warning' | 'default' | 'success'
}

const AlertSnackbar = (props: Iprops) => {
  const { open, handleCancel, type = 'default', title, subTitle } = props

  const classes = useStyles()
  const [openSnackbar, setOpen] = useState(open)

  useEffect(() => {
    setOpen(open)
  }, [open])

  const handleClose = () => {
    setOpen(false)
    if (handleCancel) handleCancel()
  }

  function SlideTransition(props: TransitionProps) {
    return <Slide {...props} direction="down" />
  }

  const backgroundColour = () => {
    let temp = { background: theme.color.yellow[500] }
    if (type === 'alert') {
      temp = { background: theme.color.red[500] }
    } else if (type === 'success') {
      temp = { background: theme.color.green[500] }
    }
    return temp
  }

  const Icon = () => {
    if (type === 'alert') {
      return (
        <IconLoader
          iconName={'Caution'}
          iconType={'status'}
          className="marginR8"
        />
      )
    } else if (type === 'success') {
      return (
        <IconLoader
          iconName={'Success'}
          iconType={'status'}
          className="marginR8"
        />
      )
    }
    return (
      <IconLoader
        iconName={'Caution'}
        iconType={'status'}
        className="marginR8"
      />
    )
  }

  return (
    <div className={classes.root}>
      {openSnackbar && (
        <Snackbar
          open={openSnackbar}
          autoHideDuration={5000}
          TransitionComponent={SlideTransition}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <SnackBarParent style={backgroundColour()}>
            <div className="flex_row_start_center">
              <Icon />
              <div>
                {title && (
                  <TextWrapper
                    text={title}
                    fontWeight={600}
                    fontSize={16}
                    className="marginB4"
                  />
                )}
                {subTitle && (
                  <TextWrapper text={subTitle} fontWeight={300} fontSize={16} />
                )}
              </div>
            </div>
            <IconLoader
              iconName={'Cross'}
              className="pointer"
              onClick={handleClose}
            />
          </SnackBarParent>
        </Snackbar>
      )}
    </div>
  )
}

const SnackBarParent = styled.div`
  backdrop-filter: blur(70px);
  border: 1px solid;
  width: max-content;
  padding: 16px;
  border-radius: 6px;
  min-width: 728px;
  border-image-source: linear-gradient(
    180deg,
    rgba(255, 116, 38, 0.1) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 600px) {
    width: max-content;
    min-width: auto;
  }
`

export default AlertSnackbar
