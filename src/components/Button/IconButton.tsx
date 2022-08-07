import styled from 'styled-components'
import { PolymorphicComponent } from 'utils/polymorphic'
import { BaseButtonProps } from './types'
import Button from './Button'

const IconButton: PolymorphicComponent<BaseButtonProps, 'button'> = styled(Button) <BaseButtonProps>`
  padding: 0;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`

export default IconButton
