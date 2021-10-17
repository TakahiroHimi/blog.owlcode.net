import Head from 'next/head'
import React, { FC } from 'react'

type Props = {
  title: string
  ogDesc: string
  ogImage: string
  ogUrl: string
}

const ArticleHead: FC<Props> = ({ title, ogDesc, ogImage, ogUrl }) => {
  return (
    <Head>
      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:type" content="article" key="ogtype" />
      <meta property="og:description" content={ogDesc} key="ogdesc" />
      <meta property="og:url" content={ogUrl} key="ogurl" />
      <meta property="og:image" content={ogImage} key="ogimage" />

      <title>{title}</title>
    </Head>
  )
}

export default ArticleHead
