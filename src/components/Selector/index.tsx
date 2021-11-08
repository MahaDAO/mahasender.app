import styled from 'styled-components'
import React, { CSSProperties } from 'react'

import theme from '../../theme'

import IconLoader from '../IconLoader'
import TextWrapper from '../TextWrapper'

interface Iprops {
  openSelector: boolean
  toggleSelector: () => void
  dropdownValue: string[]
  selectedData: string
  setSelectedData: (data: string) => void
  dontShowBackground?: boolean
  position?: {
    top: string
    bottom: string
    left: string
    right: string
  }
  className?: string
  width?: string
  dropDownWidth?: string
}

const Selector = (props: Iprops) => {
  const {
    openSelector,
    toggleSelector,
    dropdownValue,
    selectedData,
    setSelectedData,
    dontShowBackground = false,
    position = {
      top: '45px',
      bottom: '',
      left: '',
      right: '0px',
    },
    className = '',
    width = 'max-content',
    dropDownWidth = 'max-content',
  } = props

  const IContainerStyle = () => {
    let returnObj: CSSProperties = {}
    if (dontShowBackground) {
      returnObj['padding'] = '0px'
      returnObj['backgroundColor'] = 'transparent'
    }
    return returnObj
  }

  return (
    <SelectorDiv width={width}>
      <SelectorContainer
        onClick={() => toggleSelector()}
        style={IContainerStyle()}
        className={className}
      >
        <TextWrapper text={selectedData} fontWeight={600} fontSize={14} />
        {/* <IconLoader iconName={openSelector ? "ArrowUp" : "ArrowDown"} iconType={"arrow"} className="m-l-12" /> */}
        {openSelector && (
          <BackgroundAbsolute
            onClick={() => {
              toggleSelector()
            }}
          />
        )}
      </SelectorContainer>
      {openSelector && (
        <CustomDropDownContainer width={dropDownWidth} position={position}>
          {dropdownValue?.map((item, index) => {
            return (
              <CustomDropDownLi
                onClick={() => {
                  if (setSelectedData) setSelectedData(item)
                }}
                key={index}
              >
                <TextWrapper text={item} />
              </CustomDropDownLi>
            )
          })}
        </CustomDropDownContainer>
      )}
    </SelectorDiv>
  )
}

export default Selector

interface SelectorDivProps {
  width: string
}

const SelectorDiv = styled.div<SelectorDivProps>`
  position: relative;
  width: ${(props) => props.width};
`

const SelectorContainer = styled.div`
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 600px) {
  }
`

export const BackgroundAbsolute = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: transparent;
  width: 100vw;
  height: 100vh;
  z-index: 101;
`

interface CustomDropDownContainerProps {
  position: {
    top: string
    bottom: string
    left: string
    right: string
  }
  width: string
}

const CustomDropDownContainer = styled.div<CustomDropDownContainerProps>`
  position: absolute;
  top: ${({ position }) => position.top};
  bottom: ${({ position }) => position.bottom};
  right: ${({ position }) => position.right};
  left: ${({ position }) => position.left};
  z-index: 111;
  background: ${theme.color.dark[300]};
  border-radius: 6px;
  width: ${(props) => props.width};
  overflow: hidden;
`

const CustomDropDownLi = styled.div`
  display: flex;
  flex-direction: row;
  padding: 12px 20px;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`
