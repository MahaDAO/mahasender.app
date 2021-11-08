import React from 'react'
import styled from 'styled-components'

export interface TextWrapperProps {
  fontFamily?: 'Inter' | 'Syne' | 'Archivo'
  fontStyle?: string
  fontWeight?: 'normal' | 'bold' | 100 | 300 | 400 | 600
  fontSize?: 42 | 32 | 24 | 18 | 16 | 14 | 12
  FletterSpacing?: string
  lineHeight?: string
  Fcolor?: string
  text: string
  align?: 'left' | 'center' | 'right'
  className?: string
}

const TextWrapper = (props: TextWrapperProps) => {
  const {
    fontFamily = 'Inter',
    fontStyle = 'normal',
    fontWeight = 300,
    fontSize = 14,
    FletterSpacing = 'normal',
    lineHeight = 'normal',
    Fcolor = '#FFFFFF',
    text = '',
    className = '',
    align = 'left',
  } = props

  return (
    <StyledText
      fontFamily={fontFamily}
      fontSize={fontSize}
      fontWeight={fontWeight}
      fontStyle={fontStyle}
      letterSpacing={FletterSpacing}
      lineHeight={lineHeight}
      fcolor={Fcolor}
      style={{ color: Fcolor }}
      className={className}
      align={align}
    >
      {text}
    </StyledText>
  )
}

export default TextWrapper

interface StyledTextProps {
  fontFamily: 'Inter' | 'Syne' | 'Archivo'
  fontStyle: string
  fontWeight: 'normal' | 'bold' | 100 | 300 | 400 | 600
  fontSize: 42 | 32 | 24 | 18 | 16 | 14 | 12
  letterSpacing: string
  lineHeight: string
  align: 'left' | 'center' | 'right'
  fcolor: string
}

const StyledText = styled.p<StyledTextProps>`
  font-family: ${(props) => props.fontFamily};
  font-style: ${(props) => props.fontStyle};
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => props.fontSize}px;
  letter-spacing: ${(props) => props.letterSpacing};
  text-align: ${(props) => props.align};
  line-height: ${(props) => props.lineHeight};
`
