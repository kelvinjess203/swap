import React, { cloneElement, ElementType, isValidElement } from 'react'
import { getExternalLinkProps } from 'utils/getExternalLinkProps'
import StyledButton from './StyledButton'
import { ButtonProps, variants } from './types'

const Button = <E extends ElementType = 'button'>(props: ButtonProps<E>): JSX.Element => {
  const { startIcon, endIcon, external, className, isLoading, disabled, children, ...rest } = props
  const internalProps = external ? getExternalLinkProps() : {}
  const isDisabled = isLoading || disabled
  const classNames = className ? [className] : []

  if (isLoading) {
    classNames.push('kelvin-button--loading')
  }

  if (isDisabled && !isLoading) {
    classNames.push('kelvin-button--disabled')
  }

  return (
    <StyledButton
      $isLoading={isLoading}
      className={classNames.join(' ')}
      disabled={isDisabled}
      {...internalProps}
      {...rest}
    >
      <>
        {isValidElement(startIcon) &&
          cloneElement(startIcon, {
            style: { marginRight: '0.5rem' },
          } as any)}
        {children}
        {isValidElement(endIcon) &&
          cloneElement(endIcon, {
            style: { marginLeft: '0.5rem' },
          } as any)}
      </>
    </StyledButton>
  )
}

Button.defaultProps = {
  isLoading: false,
  external: false,
  variant: variants.PRIMARY,
  disabled: false,
}

export default Button
