/* eslint-disable react/no-children-prop */
import { css } from '@emotion/react'
import ArticleHead from 'components/ArticleHead'
import ArticleHeader from 'components/ArticleHeader'
import Contents from 'components/AsideCards/Contents'
import Profile from 'components/AsideCards/Profile'
import ContentsLayout from 'components/layouts/ContentsLayout'
import LinkCard from 'components/LinkCard'
import CodeBlock from 'components/md/CodeBlock'
import h2 from 'components/md/h2'
import h3 from 'components/md/h3'
import ShareIcons from 'components/ShareIcons'
import 'github-markdown-css'
import { getAllPostIds, getPostData } from 'lib/posts'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { fetchOgp, OGPFetchResult } from 'ogp-fetcher'
import React, { VFC } from 'react'
import ReactMarkdown from 'react-markdown'
import { ReactMarkdownProps } from 'react-markdown/src/ast-to-react'
import rehypeRaw from 'rehype-raw'
import removeMd from 'remove-markdown'
import breakPoints from 'styles/breakPoints'
import { MetaData } from 'utils/types'

type Props = Pick<MetaData, 'created' | 'updated' | 'title' | 'visual' | 'tags'> & {
  mdBody: string
  ogps?: OGPFetchResult | null
}

const Post: VFC<Props> = ({ title, created, updated, visual, tags, mdBody, ogps }) => {
  const router = useRouter()

  const a: (
    props: React.ClassAttributes<HTMLAnchorElement> &
      React.AnchorHTMLAttributes<HTMLAnchorElement> &
      ReactMarkdownProps
  ) => React.ReactNode = ({ node, ...props }) => {
    const href = typeof node.properties?.href === 'string' ? node.properties?.href : undefined
    const ogp = ogps?.find((ogp) => ogp.url === href)

    if (!href || !ogp) return <a {...props} />

    const linkCardProps = {
      href: href,
      title: ogp['og:title'],
      desc: ogp['og:description'],
      src: ogp['og:image'],
      alt: ogp['og:image:alt'],
      siteName: ogp['og:site_name'],
    }

    return <LinkCard {...linkCardProps} />
  }

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

      <ContentsLayout
        asideCards={
          <>
            <div css={profile}>
              <Profile />
            </div>
            <div css={contents}>
              <Contents mdBody={mdBody} />
            </div>
            <div css={shareIcons}>
              <ShareIcons title={title} />
            </div>
          </>
        }
        sticky
      >
        <div css={container}>
          <ArticleHeader
            title={title}
            created={created}
            updated={updated}
            visual={visual}
            tags={tags}
          />

          <article className="markdown-body">
            <ReactMarkdown
              children={mdBody}
              rehypePlugins={[rehypeRaw]}
              linkTarget="blank"
              components={{
                a: a,
                h2: h2,
                h3: h3,
                code: CodeBlock,
              }}
            />
          </article>
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

const profile = css`
  @media screen and (max-width: ${breakPoints.lg}) {
    order: 2;
  }
`

const contents = css`
  @media screen and (max-width: ${breakPoints.lg}) {
    display: none;
  }
`

const shareIcons = css`
  @media screen and (max-width: ${breakPoints.lg}) {
    order: 1;
  }
`

const container = css`
  width: 100%;
  padding: 0px 0px 40px 0px;
  box-sizing: border-box;
`
