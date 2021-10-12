import ArticleList from 'components/ArticleList'
import ArticleNavi from 'components/AsideCards/ArticleNavi'
import ContentsLayout from 'components/layouts/ContentsLayout'
import { getMonthCount, MonthCount } from 'lib/date'
import { getTagCount, TagCount } from 'lib/tags'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { MetaData } from 'utils/types'
import { getSortedPostsData } from '../lib/posts'

type Props = {
  allPostsData: MetaData[]
  tagCount: TagCount[]
  monthCount: MonthCount[]
}

const Home: NextPage<Props> = ({ allPostsData, tagCount, monthCount }) => {
  return (
    <React.Fragment>
      <Head>
        <meta property="og:title" content="blog.owlcode.net" />
        <meta property="og:type" content="blog" />
        <meta
          property="og:description"
          content={`@${process.env.NEXT_PUBLIC_TWITTER_ID}の技術ブログ＆雑記`}
        />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_ROOT_URL} />
        <meta property="og:site_name" content="blog.owlcode.net" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_OGP_URL}/blogTopOGP.png`} />
        <title>blog.owlcode.net</title>
      </Head>
      <ContentsLayout asideCards={<ArticleNavi tagCount={tagCount} monthCount={monthCount} />}>
        <ArticleList postsData={allPostsData} />
      </ContentsLayout>
    </React.Fragment>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const allPostsData = getSortedPostsData()
  const tagCount = getTagCount()
  const monthCount = getMonthCount()
  return {
    props: {
      allPostsData,
      tagCount,
      monthCount,
    },
  }
}

export default Home
