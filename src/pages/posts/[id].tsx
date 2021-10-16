/* eslint-disable react/no-children-prop */
import { css } from '@emotion/react'
import { mdiClockTimeTwoOutline, mdiLeadPencil } from '@mdi/js'
import Icon from '@mdi/react'
import Contents from 'components/AsideCards/Contents'
import Profile from 'components/AsideCards/Profile'
import ContentsLayout from 'components/layouts/ContentsLayout'
import LinkCard from 'components/LinkCard'
import CodeBlock from 'components/md/CodeBlock'
import ShareIcons from 'components/ShareIcons'
import Tag from 'components/Tag'
import 'github-markdown-css'
import { getAllPostIds, getPostData } from 'lib/posts'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { fetchOgp, OGPFetchResult } from 'ogp-fetcher'
import React, { VFC } from 'react'
import ReactMarkdown from 'react-markdown'
import { HeadingComponent, ReactMarkdownProps } from 'react-markdown/src/ast-to-react'
import rehypeRaw from 'rehype-raw'
import removeMd from 'remove-markdown'
import breakPoints from 'styles/breakPoints'
import colors from 'styles/colors'
import { MetaData } from 'utils/types'

type Props = Pick<MetaData, 'created' | 'updated' | 'title' | 'visual' | 'tags'> & {
  mdBody: string
  ogps?: OGPFetchResult | null
}

const h2: HeadingComponent = ({ node, ...props }) => {
  return <h2 id={node.position?.start.line.toString()}>{props.children}</h2>
}

const h3: HeadingComponent = ({ node, ...props }) => {
  return <h3 id={node.position?.start.line.toString()}>{props.children}</h3>
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

  return (
    <React.Fragment>
      <Head>
        <meta property="og:title" content={title} key="ogtitle" />
        <meta property="og:type" content="article" key="ogtype" />
        <meta
          property="og:description"
          content={removeMd(mdBody)
            .replace(/\r?\n/g, ' ')
            .replace(/&nbsp;/g, '')
            .substring(0, 200)}
          key="ogdesc"
        />
        <meta
          property="og:url"
          content={process.env.NEXT_PUBLIC_ROOT_URL + router.asPath}
          key="ogurl"
        />
        <meta
          property="og:image"
          content={`${
            process.env.NEXT_PUBLIC_OGP_URL
          }/${title}.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fogp.owlcode.net%2Fimages%2F${
            visual || 'note'
          }.png`}
          key="ogimage"
        />
        <title>{title}</title>
      </Head>
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
          <div css={imageWrapper}>
            <Image
              src={`${process.env.NEXT_PUBLIC_OGP_URL}/images/${visual || 'note'}.png`}
              alt={visual}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <h1 css={articleTitle}>{title}</h1>
          <div css={dateContainer}>
            <div css={date}>
              <Icon path={mdiLeadPencil} size={0.7} />
              <p>{created}</p>
            </div>
            {updated && (
              <div css={date}>
                <Icon path={mdiClockTimeTwoOutline} size={0.7} />
                <p>{updated}</p>
              </div>
            )}
          </div>
          <ul css={tagsContainer}>
            {tags.map((tag) => (
              <li key={tag}>
                <Tag tag={tag} />
              </li>
            ))}
          </ul>

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

const imageWrapper = css`
  display: flex;
  height: 100px;
  position: relative;
  margin-bottom: 24px;
`

const articleTitle = css`
  font-size: 2.5rem;
  font-weight: bold;
  margin-top: 8px;
`

const dateContainer = css`
  display: flex;
  align-items: center;
  gap: 24px;
  margin: 12px 0px 0px 0px;
`

const date = css`
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: ${colors.gray200};
  margin-bottom: 8px;
`

const tagsContainer = css`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 8px;
  margin: 8px 0px 40px;
`
