
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'

import { PersistGate } from 'redux-persist/integration/react'


import { persistor, useStore } from '../src/state/store';

import Providers from '../src/views/Providers';
import Updaters from '../src/views/Updaters';

import ResetCSS from '../src/styles/resetCSS';
import GlobalStyle from '../src/styles/global';

import ToastListener from '../src/contexts/ToastsContext/Listener';

const MyApp = (props: AppProps) => {
  const { pageProps } = props;
  const store = useStore(pageProps.initialReduxState)
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover"
        />
        <meta
          name="description"
          content="DESCRIPTION_PAGE"
        />

        <meta
          name="twitter:description"
          content="DESCRIPTION_PAGE_TWITTER"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TWITTER_TITLE" />
        <meta property="twitter:image" content="TWITTER_IMAGE" />
      </Head>
      <Providers store={store}>
        <Updaters />
        <ResetCSS />
        <GlobalStyle />
        <PersistGate loading={null} persistor={persistor}>
          <App {...props} />
        </PersistGate>
      </Providers>

    </>
  )
}


type NextPageWithLayout = NextPage & {
  Layout?: React.FC
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  return (
    <>
      {/* <Layout> */}
      <Component {...pageProps} />
      {/* </Layout> */}
      <ToastListener />
    </>
  )
}


export default MyApp
