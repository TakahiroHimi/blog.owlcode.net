import { css, Global } from '@emotion/react'
import Layout from 'components/layouts/Layout'
import type { AppProps } from 'next/app'
import React from 'react'
import 'reset-css'
import colors from 'styles/colors'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Global
        styles={css`
          html,
          body {
            font-family: 'Roboto', 'Noto Sans JP', sans-serif;
            color: ${colors.black};
          }
        `}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </React.Fragment>
  )
}
