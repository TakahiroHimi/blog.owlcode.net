/* eslint-disable react/no-children-prop */
import { css } from '@emotion/react'
import CodeBlock from 'components/CodeBlock'
import ContentsLayout from 'components/layouts/ContentsLayout'
import 'github-markdown-css'
import { getAllPostIds, getPostData } from 'lib/posts'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import React, { VFC } from 'react'
import ReactMarkdown from 'react-markdown'
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton } from 'react-share'
import colors from 'styles/colors'

type Props = {
  title: string
  created: string
  contentHtml: string
}

const Post: VFC<Props> = ({ title, created, contentHtml }) => {
  const router = useRouter()

  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
      </Head>
      <ContentsLayout>
        <div css={container}>
          <p css={date}>{created}</p>
          <h1 css={articleTitle}>{title}</h1>
          <article className="markdown-body">
            <ReactMarkdown
              children={contentHtml}
              components={{
                code: CodeBlock,
              }}
            />
          </article>
          <aside css={shareButtons}>
            <TwitterShareButton
              url={process.env.NEXT_PUBLIC_ROOT_URL + router.asPath}
              title={title}
              via={process.env.NEXT_PUBLIC_TWITTER_ID}
            >
              <TwitterIcon round size={50} />
            </TwitterShareButton>
            <FacebookShareButton url={process.env.NEXT_PUBLIC_ROOT_URL + router.asPath}>
              <FacebookIcon round size={50} />
            </FacebookShareButton>
          </aside>
        </div>
      </ContentsLayout>
    </React.Fragment>
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
  return {
    props: {
      title: postData?.title ?? '',
      created: postData?.created ?? '',
      contentHtml: postData?.contentHtml ?? '',
    },
  }
}

const container = css`
  width: 100%;
  padding-right: 28px;
`

const date = css`
  font-size: 1rem;
  color: ${colors.gray200};
`

const articleTitle = css`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${colors.blue400};
  margin: 16px 0px 48px;
`

const shareButtons = css`
  display: flex;
  justify-content: center;
  gap: 32px;
  margin: 64px 0px 32px;
`
