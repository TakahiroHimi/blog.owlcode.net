import { css, Global } from '@emotion/react'
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
            font-family: 'Noto Sans JP', sans-serif;
          }
        `}
      />
      <Component {...pageProps} />
    </React.Fragment>
  )
}
