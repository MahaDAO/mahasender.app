import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Loader from 'react-spinners/PulseLoader'

import fileTheme from '../../theme'
// import { Mixpanel } from "../../analytics/Mixpanel";

interface ButtonProps {
  children?: React.ReactNode
  disabled?: boolean
  href?: string
  onClick?: () => void
  size?: 'sm' | 'md' | 'lg'
  text?: string
  to?: string
  theme?: 'default' | 'secondary' | 'tertiary'
  variant?: 'default' | 'transparent' | 'outlined' | 'rounded'
  loading?: boolean
  tracking_id?: string
  value?: object
}

function variantToStyle(variant: string = 'default', color: any) {
  if (variant === 'transparent') {
    return {
      fg: {
        normal: color.white,
      },
      bg: {
        normal: color.transparentog,
        hover: color.dark[100],
        selected: color.dark[300],
      },
      border: {
        normal: `1px solid ${color.transparent[300]}`,
        hover: `1px solid ${color.dark[100]}`,
        radius: '6px',
        radiusHover: '6px',
      },
    }
  } else if (variant === 'outlined') {
    return {
      fg: { normal: color.transparent[100], hover: color.transparent[100] },
      bg: {
        normal: color.transparentog,
        hover: color.transparentog,
        disabled: color.transparentog,
      },
      border: {
        normal: `1px solid ${color.transparent[300]}`,
        hover: `1px solid ${color.transparent[200]}`,
      },
    }
  } else if (variant === 'rounded') {
    return {
      fg: { normal: color.primary[300] },
      bg: { normal: color.transparent[100], disabled: color.transparentog },
      border: { radius: '19px', radiusHover: '19px' },
    }
  } else {
    return {
      fg: {},
      bg: {},
      border: {},
    }
  }
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  href,
  onClick,
  size,
  text,
  to,
  theme,
  variant,
  loading = false,
  tracking_id = '',
  value = null,
}) => {
  const { color, spacing } = fileTheme

  const variantStyle = variantToStyle(variant, color)

  let fg = {
    normal: theme === 'secondary' ? color.teal[200] : color.white,
    hover: color.white,
    selected: theme === 'secondary' ? color.teal[200] : color.white,
    disabled: '',
    ...variantStyle.fg,
  }

  let bg = {
    normal: `linear-gradient(38.44deg, ${color.pink[200]} 15.81%, ${color.pink[400]} 87.57%)`,
    hover: color.pink[300],
    selected: `linear-gradient(180deg, ${color.pink[200]} -11.33%, ${color.pink[400]} 100%)`,
    disabled: color.transparent[300],
    ...variantStyle.bg,
  }

  let border = {
    normal: '0',
    hover: '0',
    radius: '6px',
    radiusHover: variantStyle.border.radiusHover || '6px',
    ...variantStyle.border,
  }

  let buttonSize: number
  let buttonPadding: number
  let fontSize: number

  switch (size) {
    case 'sm':
      buttonPadding = spacing[3]
      buttonSize = 36
      fontSize = 14
      break
    case 'lg':
      buttonPadding = spacing[4]
      buttonSize = 44
      fontSize = 14
      break
    case 'md':
      buttonPadding = spacing[4]
      buttonSize = 34
      fontSize = 14
      break
    default:
      buttonPadding = spacing[4]
      buttonSize = 44
      fontSize = 14
  }

  const ButtonChild = useMemo(() => {
    if (to) {
      return <StyledLink to={to}>{text}</StyledLink>
    } else if (href) {
      return (
        <StyledExternalLink href={href} target="__blank">
          {text}
        </StyledExternalLink>
      )
    } else {
      return text
    }
  }, [href, text, to])

  return (
    <StyledButton
      boxShadow={'0'}
      fg={fg}
      bg={bg}
      border={border}
      disabled={disabled || loading}
      fontSize={fontSize}
      onClick={() => {
        // if (tracking_id) {
        //   if (value) {
        //     Mixpanel.track(`buttonClick:${tracking_id}`, value)
        //   } else {
        //     Mixpanel.track(`buttonClick:${tracking_id}`)
        //   }
        // }
        if (onClick) onClick()
      }}
      padding={buttonPadding}
      size={buttonSize}
      id={tracking_id}
    >
      {!loading && children}
      {!loading && ButtonChild}
      <Loader color={'#ffffff'} loading={loading} size={10} margin={2} />
    </StyledButton>
  )
}

interface StyledButtonProps {
  fg: { normal: string; hover: string; selected: string; disabled: string }
  bg: { normal: string; hover: string; selected: string; disabled: string }
  border: { normal: string; hover: string; radius: string; radiusHover: string }
  boxShadow: string
  disabled?: boolean
  fontSize: number
  padding: number
  size: number
}

const StyledButton = styled.button<StyledButtonProps>`
  position: relative;
  color: ${({ fg }) => fg.normal};
  background: ${({ bg }) => bg.normal};
  border: ${({ border }) => border.normal};
  border-radius: ${({ border }) => border.radius};
  box-shadow: ${(props) => props.boxShadow};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

  align-items: center;
  text-align: center;
  white-space: nowrap;
  display: flex;
  font-size: 14px;
  font-weight: 600;
  height: ${({ size }) => size}px;
  justify-content: center;
  outline: none !important;
  padding: 10px 22px;
  width: 100%;

  &:hover {
    color: ${({ fg }) => fg.hover};
    background: ${({ bg }) => bg.hover};
    border: ${({ border }) => border.hover};
    border-radius: ${({ border }) => border.radiusHover};
  }
  &:focus {
    color: ${({ fg }) => fg.selected};
    background: ${({ bg }) => bg.selected};
  }
  &:disabled {
    color: ${({ fg }) => fg.disabled};
    background: ${({ bg }) => bg.disabled};
    cursor: not-allowed;
    opacity: 0.5;
  }
`

const StyledLink = styled(Link)`
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1;
  height: 38px;
  justify-content: center;
  margin: 0 ${(props) => -fileTheme.spacing[4]}px;
  padding: 0 ${(props) => fileTheme.spacing[4]}px;
  text-decoration: none;
  position: absolute;
  width: inherit;
`

const StyledExternalLink = styled.a`
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1;
  height: 38px;
  justify-content: center;
  margin: 0 ${(props) => -fileTheme.spacing[4]}px;
  padding: 0 ${(props) => fileTheme.spacing[4]}px;
  text-decoration: none;
  position: absolute;
  width: inherit;
`

export default Button
