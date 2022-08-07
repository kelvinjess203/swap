import styled from 'styled-components'
import Text from '../Text'
import { tags, scales, HeadingProps } from './types'

const style = {
  [scales.MD]: {
    fontSize: '14px',
    fontSizeXs: '16px',
    fontSizeLg: '20px',
  },
  [scales.LG]: {
    fontSize: '16px',
    fontSizeXs: '20px',
    fontSizeLg: '24px',
  },
  [scales.XL]: {
    fontSize: '18px',
    fontSizeXs: '24px',
    fontSizeLg: '28px',
  },
  [scales.XXL]: {
    fontSize: '48px',
    fontSizeXs: '56px',
    fontSizeLg: '64px',
  },
}

const Heading = styled(Text).attrs({ bold: true }) <HeadingProps>`
  font-size: ${({ scale }) => style[scale || scales.MD].fontSize};
  font-weight: 600;
  line-height: 1.1;

  ${({ theme }) => theme.mediaQueries.xs} {
    font-size: ${({ scale }) => style[scale || scales.MD].fontSizeXs};
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: ${({ scale }) => style[scale || scales.MD].fontSizeLg};
  }
`

Heading.defaultProps = {
  as: tags.H2,
}

export default Heading
