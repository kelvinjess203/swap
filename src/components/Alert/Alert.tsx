import React from 'react'
import styled, { DefaultTheme } from 'styled-components'
import CheckmarkCircleIcon from 'svgs/success.svg'
import ErrorIcon from 'svgs/triangle-warning.svg'
import BlockIcon from 'svgs/block.svg'
import InfoIcon from 'svgs/info.svg'
import CloseIcon from 'svgs/close.svg'
import Text from '../Text'
import IconButton from '../Button/IconButton'
import Flex from '../Box/Flex'
import { AlertProps, Variants, variants } from './types'

interface ThemedIconLabel {
  variant: AlertProps['variant']
  theme: DefaultTheme
  hasDescription: boolean
}

const getThemeColor = ({ theme, variant = variants.INFO }: ThemedIconLabel) => {
  switch (variant) {
    case variants.DANGER:
      return theme.colors.failure
    case variants.WARNING:
      return theme.colors.warning
    case variants.SUCCESS:
      return theme.colors.success
    case variants.INFO:
    default:
      return theme.colors.primary
  }
}

const getIcon = (variant: AlertProps['variant'] = variants.INFO) => {
  switch (variant) {
    case variants.DANGER:
      return BlockIcon
    case variants.WARNING:
      return ErrorIcon
    case variants.SUCCESS:
      return CheckmarkCircleIcon
    case variants.INFO:
    default:
      return InfoIcon
  }
}

const IconLabel = styled.div<ThemedIconLabel>`
  backdrop-filter: blur(15px);
  padding: 12px;
  border-radius: 5px 0px 0px 5px;

  svg {
    fill: ${getThemeColor};
  }
`

const withHandlerSpacing = 32 + 12 + 8 // button size + inner spacing + handler position
const Details = styled.div<{ hasHandler: boolean }>`
  flex: 1;
  color: ${({ theme }) => theme.colors.text};
  padding-bottom: 12px;
  padding-left: 12px;
  padding-right: ${({ hasHandler }) => (hasHandler ? `${withHandlerSpacing}px` : '12px')};
  padding-top: 12px;

  border-radius: 0px 5px 5px 0px;
  backdrop-filter: blur(15px);
`

const CloseHandler = styled.div`
  border-radius: 0 16px 16px 0;
  right: 8px;
  position: absolute;
  top: 8px;
`

const StyledAlert = styled(Flex)<{ variant: Variants; hasDescription: boolean }>`
  background-color: ${getThemeColor}80;
  position: relative;
  border-radius: 5px;
  box-shadow: 0px 20px 36px -8px rgba(14, 14, 44, 0.1), 0px 1px 1px rgba(0, 0, 0, 0.05);
`

const Alert: React.FC<AlertProps> = ({ title, children, variant, onClick }) => {
  const Icon = getIcon(variant)

  return (
    <StyledAlert variant={variant} hasDescription={!!children}>
      <IconLabel variant={variant} hasDescription={!!children}>
        <Icon width="24px" />
      </IconLabel>
      <Details hasHandler={!!onClick}>
        <Text scale="md" bold>
          {title}
        </Text>
        {typeof children === 'string' ? (
          <Text as="p" scale="xs" color="text">
            {children}
          </Text>
        ) : (
          children
        )}
      </Details>
      {onClick && (
        <CloseHandler>
          <IconButton variant="text" onClick={onClick}>
            <CloseIcon fill="#fff" width="24px" color="currentColor" />
          </IconButton>
        </CloseHandler>
      )}
    </StyledAlert>
  )
}

export default Alert
