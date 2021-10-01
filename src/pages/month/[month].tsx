import ArticleList from 'components/ArticleList'
import ArticleNavi from 'components/ArticleNavi'
import ContentsLayout from 'components/layouts/ContentsLayout'
import { getMonthCount, MonthCount } from 'lib/date'
import { getSortedPostsData } from 'lib/posts'
import { getTagCount, TagCount } from 'lib/tags'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import React, { VFC } from 'react'
import { MetaData } from 'utils/types'

type Props = {
  postsData: MetaData[]
  tagCount: TagCount[]
  monthCount: MonthCount[]
}

type Params = {
  month: string
}

const MonthPage: VFC<Props> = ({ postsData, tagCount, monthCount }) => {
  const router = useRouter()

  return (
    <React.Fragment>
      <Head>
        <title>{`Month | ${router.query.month}`}</title>
      </Head>
      <ContentsLayout asideCards={<ArticleNavi tagCount={tagCount} monthCount={monthCount} />}>
        <ArticleList postsData={postsData} />
      </ContentsLayout>
    </React.Fragment>
  )
}

export default MonthPage

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = getMonthCount().map((monthData) => {
    return { params: { month: monthData.month } }
  })
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const postsData = params?.month
    ? getSortedPostsData().filter((post) => post.created.substring(0, 7) === params.month)
    : []
  const tagCount = getTagCount()
  const monthCount = getMonthCount()
  return {
    props: {
      postsData,
      tagCount,
      monthCount,
    },
  }
}
