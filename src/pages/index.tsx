import ArticleNavi from 'components/ArticleNavi'
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
        <title>blog.thimi.io</title>
      </Head>
      <ContentsLayout
        postsData={allPostsData}
        asideCards={<ArticleNavi tagCount={tagCount} monthCount={monthCount} />}
      />
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
