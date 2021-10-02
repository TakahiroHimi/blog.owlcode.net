import { css, Global } from '@emotion/react'
import PageLayout from 'components/layouts/PageLayout'
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
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif,
              Apple Color Emoji, Segoe UI Emoji;
            color: ${colors.black80};
          }
        `}
      />
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </React.Fragment>
  )
}
