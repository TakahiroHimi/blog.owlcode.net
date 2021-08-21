import { getAllTags } from 'lib/tags'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'

export default function Post({
  tag,
  posts,
}: {
  tag: string
  posts: {
    id: string
    contentHtml: string
    title: string
    date: string
    tags: string[]
  }[]
}) {
  return (
    <React.Fragment>
      <Head>
        <title>{tag}</title>
      </Head>
      {posts.length}
    </React.Fragment>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllTags()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log(!!params)
  return {
    props: {
      tag: 'test',
      posts: {
        id: 1,
        title: 'サンプル記事',
      },
    },
  }
}
