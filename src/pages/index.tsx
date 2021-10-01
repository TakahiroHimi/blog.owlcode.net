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

// const listItem = css`
//   margin-bottom: 32px;
// `

// const createdAt = css`
//   font-size: 1rem;
//   color: ${colors.gray200};
//   margin-bottom: 8px;
// `

// const titleText = css`
//   font-size: 1.7rem;
//   color: ${colors.blue400};
//   text-decoration: none;
//   cursor: pointer;
// `

// const tagsContainer = css`
//   margin-top: 8px;
//   display: flex;
//   gap: 8px;
// `

// const link = css`
//   text-decoration: none;
//   cursor: pointer;
// `
