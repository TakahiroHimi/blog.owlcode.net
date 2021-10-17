import { css } from '@emotion/react'
import ArticleAsideCard from 'components/ArticleAsideCard'
import ArticleBody from 'components/ArticleBody'
import ArticleHead from 'components/ArticleHead'
import ArticleHeader from 'components/ArticleHeader'
import ContentsLayout from 'components/layouts/ContentsLayout'
import 'github-markdown-css'
import { getAllPostIds, getPostData } from 'lib/posts'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { fetchOgp, OGPFetchResult } from 'ogp-fetcher'
import React, { VFC } from 'react'
import removeMd from 'remove-markdown'
import { MetaData } from 'utils/types'

type Props = Pick<MetaData, 'created' | 'updated' | 'title' | 'visual' | 'tags'> & {
  mdBody: string
  ogps?: OGPFetchResult | null
}

const Post: VFC<Props> = ({ title, created, updated, visual, tags, mdBody, ogps }) => {
  const router = useRouter()

  const ogDesc = removeMd(mdBody)
    .replace(/\r?\n/g, ' ')
    .replace(/&nbsp;/g, '')
    .substring(0, 200)

  const ogImage = `${
    process.env.NEXT_PUBLIC_OGP_URL
  }/${title}.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fogp.owlcode.net%2Fimages%2F${
    visual || 'note'
  }.png`

  return (
    <>
      <ArticleHead
        title={title}
        ogDesc={ogDesc}
        ogImage={ogImage}
        ogUrl={process.env.NEXT_PUBLIC_ROOT_URL + router.asPath}
      />

      <ContentsLayout asideCards={<ArticleAsideCard mdBody={mdBody} title={title} />} sticky>
        <div css={container}>
          <ArticleHeader
            title={title}
            created={created}
            updated={updated}
            visual={visual}
            tags={tags}
          />

          <ArticleBody mdBody={mdBody} ogps={ogps ?? []} />
        </div>
      </ContentsLayout>
    </>
  )
}

export default Post

export const getStaticPaths: GetStaticPaths = async () => {
  const allPostIds = getAllPostIds()

  return {
    paths: allPostIds.map((postId) => {
      return {
        params: {
          id: postId,
        },
      }
    }),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (params === undefined) return { notFound: true }
  const postData = await getPostData(params.id as string)
  const regResult = postData?.mdBody.matchAll(/^<(https:\/\/.*?)>.*?$/gims)
  const urls = regResult ? Array.from(regResult).map((reg) => reg[1]) : undefined
  const ogps = urls !== undefined && urls.length > 0 ? await fetchOgp(urls) : null

  return {
    props: {
      title: postData?.title ?? '',
      created: postData?.created ?? '',
      updated: postData?.updated ?? '',
      visual: postData?.visual ?? '',
      tags: postData?.tags ?? [],
      mdBody: postData?.mdBody ?? '',
      ogps: ogps,
    },
  }
}

const container = css`
  width: 100%;
  padding: 0px 0px 40px 0px;
  box-sizing: border-box;
`
