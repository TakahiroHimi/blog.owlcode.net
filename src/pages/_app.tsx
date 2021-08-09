import { css, Global } from '@emotion/react'
import Layout from 'components/layouts/Layout'
import type { AppProps } from 'next/app'
import React from 'react'
import 'reset-css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Global
        styles={css`
          html,
          body {
            font-family: 'Roboto', 'Noto Sans JP', sans-serif;
          }
        `}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </React.Fragment>
  )
}
