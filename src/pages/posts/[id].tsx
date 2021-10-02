/* eslint-disable react/no-children-prop */
import { css } from '@emotion/react'
import Contents from 'components/AsideCards/Contents'
import ContentsLayout from 'components/layouts/ContentsLayout'
import CodeBlock from 'components/md/CodeBlock'
import Tag from 'components/Tag'
import 'github-markdown-css'
import { getAllPostIds, getPostData } from 'lib/posts'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import React, { VFC } from 'react'
import ReactMarkdown from 'react-markdown'
import { HeadingComponent } from 'react-markdown/src/ast-to-react'
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton } from 'react-share'
import colors from 'styles/colors'
import { MetaData } from 'utils/types'

type Props = Pick<MetaData, 'created' | 'updated' | 'title' | 'tags'> & {
  mdBody: string
}

const h2: HeadingComponent = ({ node, ...props }) => {
  return <h2 id={node.position?.start.line.toString()}>{props.children}</h2>
}

const h3: HeadingComponent = ({ node, ...props }) => {
  return <h3 id={node.position?.start.line.toString()}>{props.children}</h3>
}

const Post: VFC<Props> = ({ title, created, updated, tags, mdBody }) => {
  const router = useRouter()

  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
      </Head>
      <ContentsLayout
        asideCards={
          <>
            <Contents mdBody={mdBody} />
          </>
        }
        sticky
      >
        <div css={container}>
          <h1 css={articleTitle}>{title}</h1>
          <ul css={tagsContainer}>
            {tags.map((tag) => (
              <li key={tag}>
                <Tag tag={tag} />
              </li>
            ))}
          </ul>
          <p css={date}>
            公開日：{created}
            {updated && `${'　　'}更新日：${updated}`}
          </p>
          <article className="markdown-body">
            <ReactMarkdown
              children={mdBody}
              components={{
                h2: h2,
                h3: h3,
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
      updated: postData?.updated ?? '',
      tags: postData?.tags ?? [],
      mdBody: postData?.mdBody ?? '',
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
  margin: 12px 0px 40px;
`

const articleTitle = css`
  font-size: 2.5rem;
  font-weight: bold;
  margin-top: 8px;
`

const tagsContainer = css`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 8px;
  margin: 12px 0px 0px 0px;
`

const shareButtons = css`
  display: flex;
  justify-content: center;
  gap: 32px;
  margin: 64px 0px 32px;
`
