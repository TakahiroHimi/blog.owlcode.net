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
  tag: string
}

const TagPage: VFC<Props> = ({ postsData, tagCount, monthCount }) => {
  const router = useRouter()

  console.log(router)

  return (
    <React.Fragment>
      <Head>
        <title>{`Tag | ${router.query.tag}`}</title>
      </Head>
      <ContentsLayout
        postsData={postsData}
        asideCards={<ArticleNavi tagCount={tagCount} monthCount={monthCount} />}
      />
    </React.Fragment>
  )
}

export default TagPage

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = getTagCount().map((tagData) => {
    return { params: { tag: tagData.tag } }
  })
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const postsData = params?.tag
    ? getSortedPostsData().filter((post) => post.tags.includes(params.tag))
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
