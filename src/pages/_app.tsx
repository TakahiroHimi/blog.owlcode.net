import { css, Global } from '@emotion/react'
import PageLayout from 'components/layouts/PageLayout'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'
import 'reset-css'
import colors from 'styles/colors'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Head>
        <meta property="og:title" content="blog.owlcode.net" key="ogtitle" />
        <meta property="og:type" content="blog" key="ogtype" />
        <meta
          property="og:description"
          content={`@${process.env.NEXT_PUBLIC_TWITTER_ID}の技術ブログ＆雑記`}
          key="ogdesc"
        />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_ROOT_URL} key="ogurl" />
        <meta property="og:site_name" content="blog.owlcode.net" key="ogsite_name" />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_OGP_URL}/blogTopOGP.png`}
          key="ogimage"
        />
      </Head>
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
