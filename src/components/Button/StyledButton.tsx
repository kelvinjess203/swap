import styled, { DefaultTheme } from 'styled-components'
import { space, layout, variant } from 'styled-system'
import { styleVariants } from './theme'
import { BaseButtonProps } from './types'

interface ThemedButtonProps extends BaseButtonProps {
  theme: DefaultTheme
}

interface TransientButtonProps extends ThemedButtonProps {
  $isLoading?: boolean
}

const getDisabledStyles = ({ $isLoading, theme }: TransientButtonProps) => {
  if ($isLoading === true) {
    return `
      &:disabled,
      &.button--disabled {
        cursor: not-allowed;
      }
    `
  }

  return `
    &:disabled,
    &.button--disabled {
      background: ${theme.colors.input};
      border-color: ${theme.colors.input};
      box-shadow: none;
      color: ${theme.colors.textDisabled};
      cursor: not-allowed;
    }
  `
}

/**
 * This is to get around an issue where if you use a Link component
 * React will throw a invalid DOM attribute error
 * @see https://github.com/styled-components/styled-components/issues/135
 */

const getOpacity = ({ $isLoading = false }: TransientButtonProps) => {
  return $isLoading ? '.5' : '0.75'
}

const StyledButton = styled.button<BaseButtonProps>`
  align-items: center;
  border: 0;
  border-radius: ${({ theme }) => theme.radius.small};
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-size: 12px;
  height: ${({ height }) => height || '28px'};
  font-weight: 400;
  justify-content: center;
  letter-spacing: 0.03em;
  padding: 0px 6px;
  line-height: 1;
  opacity: ${getOpacity};
  outline: 0;
  transition: background-color 0.2s, opacity 0.2s;

  &:hover:not(:disabled):not(.button--disabled):not(.button--disabled):not(:active) {
    opacity: 1;
  }

  &:active:not(:disabled):not(.button--disabled):not(.button--disabled) {
    opacity: 1;
  }

  ${getDisabledStyles}
  ${variant({
  variants: styleVariants,
})}
  ${layout}
  ${space}

  ${({ theme }) => theme.mediaQueries.xs} {
    font-size: 14px;
    height: ${({ height }) => height || '36px'};
    padding: 0px 12px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 16px;
    padding: 0px 16px;
  }
`

export default StyledButton
