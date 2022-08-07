import React from 'react'
import styled from 'styled-components'
import { getExternalLinkProps } from 'utils/getExternalLinkProps'

import { NextLinkFromReactRouter } from 'components/NextLink'
import Text from 'components/Text'

import { LinkProps } from './types'

const StyledLink = styled(Text) <LinkProps>`
  display: flex;
  align-items: center;
  width: fit-content;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const Link: React.FC<LinkProps> = ({ external, href, ...props }) => {
  const internalProps = external ? getExternalLinkProps() : {}
  return (
    <StyledLink as={external ? 'a' : NextLinkFromReactRouter} to={href} href={href} {...internalProps} {...props} />
  )
}

Link.defaultProps = {
  color: 'text',
}

export default Link
