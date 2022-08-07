import React from 'react'
import styled from 'styled-components'
import OpenNewIcon from 'svgs/external-link.svg'
import { colors } from 'theme/colors'
import Link from './Link'
import { LinkProps } from './types'

const StyleLink = styled(Link)`
  &:hover {
    text-decoration: underline;
  }
`

const LinkExternal: React.FC<LinkProps> = ({ hideIcon, children, ...props }) => {
  return (
    <StyleLink external {...props}>
      {children}
      {!hideIcon && (
        <OpenNewIcon fill={props.color ? colors[props.color] : colors.primary} style={{ marginLeft: '4px' }} />
      )}
    </StyleLink>
  )
}

export default LinkExternal
