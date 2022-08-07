import React from 'react'
import { Web3ReactProvider } from '@web3-react/core'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { Store } from '@reduxjs/toolkit'
import { getLibrary } from '../utils/web3React'
import KelvinJessTheme from 'styles'
import { ToastsProvider } from 'contexts/ToastsContext/Provider'
import ModalProvider from 'contexts/ModalContext'


const Providers: React.FC<{ store: Store; children: React.ReactNode }> = ({ children, store }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <ToastsProvider>
          <ThemeProvider theme={KelvinJessTheme}>
            <ModalProvider>
              {children}
            </ModalProvider>
          </ThemeProvider>
        </ToastsProvider>
      </Provider>
    </Web3ReactProvider>
  )
}

export default Providers
