import { createGlobalStyle } from 'styled-components'
import { KelvinJessTheme } from './types'

declare module 'styled-components' {
  export interface DefaultTheme extends KelvinJessTheme { }
}

const GlobalStyle = createGlobalStyle`;
  * {
    font-family: 'Space Grotesk', sans-serif;
  }

  html{
    /* background: ${({ theme }) => theme.colors.background}; */ // Todo
  }
  
  body {
    min-height: 100vh;
    /* background: ${({ theme }) => theme.colors.background}; */ // 

    img {
      height: auto;
      max-width: 100%;
    }

    
    &.no-scroll {
      overflow: hidden;
    }
  }
`

export default GlobalStyle
