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
        <meta property="og:title" content={process.env.NEXT_PUBLIC_BLOG_TITLE} key="ogtitle" />
        <meta property="og:type" content="blog" key="ogtype" />
        <meta
          property="og:description"
          content={`@${process.env.NEXT_PUBLIC_TWITTER_ID}の技術ブログ＆雑記`}
          key="ogdesc"
        />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_ROOT_URL} key="ogurl" />
        <meta
          property="og:site_name"
          content={process.env.NEXT_PUBLIC_BLOG_TITLE}
          key="ogsite_name"
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_OGP_URL}/blogTopOGP.png`}
          key="ogimage"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={'@' + process.env.NEXT_PUBLIC_TWITTER_ID} />
        <meta name="twitter:creator" content={'@' + process.env.NEXT_PUBLIC_TWITTER_ID} />
      </Head>
      <Global
        styles={css`
          html,
          body {
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif,
              Apple Color Emoji, Segoe UI Emoji;
            color: ${colors.black80};
          }
          .markdown-body {
            ul {
              list-style: disc;
            }
            ol {
              list-style: decimal;
            }
            a:link {
              text-decoration: none;
            }
            p {
              line-height: 1.8;
            }
            h2 {
              border-bottom: 2px solid ${colors.blue100};
            }
          }
        `}
      />
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </React.Fragment>
  )
}
