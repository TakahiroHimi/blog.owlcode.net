import { css } from '@emotion/react'
import ContentsLayout from 'components/layouts/ContentsLayout'
import { getAllPostIds, getPostData } from 'lib/posts'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import React from 'react'
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton } from 'react-share'
import colors from 'styles/colors'

export default function Post({
  postData,
}: {
  postData: {
    title: string
    created: string
    contentHtml: string
  }
}) {
  const router = useRouter()

  return (
    <React.Fragment>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <ContentsLayout>
        <article>
          <p css={date}>{postData.created}</p>
          <h1 css={title}>{postData.title}</h1>
          <div css={article} dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
        <aside css={shareButtons}>
          <TwitterShareButton
            url={process.env.NEXT_PUBLIC_ROOT_URL + router.asPath}
            title={postData.title}
            via={process.env.NEXT_PUBLIC_TWITTER_ID}
          >
            <TwitterIcon round size={50} />
          </TwitterShareButton>
          <FacebookShareButton url={process.env.NEXT_PUBLIC_ROOT_URL + router.asPath}>
            <FacebookIcon round size={50} />
          </FacebookShareButton>
        </aside>
      </ContentsLayout>
    </React.Fragment>
  )
}

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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params === undefined) return { notFound: true }
  const postData = await getPostData(params.id as string)
  return {
    props: {
      postData,
    },
  }
}

const date = css`
  font-size: 1rem;
  color: ${colors.gray200};
  margin-bottom: 8px;
`

const title = css`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${colors.blue400};
  margin-bottom: 64px;
`

const shareButtons = css`
  display: flex;
  justify-content: center;
  gap: 32px;
  margin: 64px 0px 32px;
`

const article = css`
  * {
    font-family: 'Noto Sans JP', sans-serif;
    color: ${colors.text};
  }

  p {
    display: block;
    -webkit-margin-before: 1__qem;
    -webkit-margin-after: 1__qem;
    -webkit-margin-start: 0;
    -webkit-margin-end: 0;
  }

  marquee {
    display: inline-block;
  }

  blockquote {
    display: block;
    -webkit-margin-before: 1__qem;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 40px;
    -webkit-margin-end: 40px;
  }

  figcaption {
    display: block;
  }

  figure {
    display: block;
    -webkit-margin-before: 1em;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 40px;
    -webkit-margin-end: 40px;
  }

  q {
    display: inline;
  }

  q::before {
    content: open-quote;
  }

  q::after {
    content: close-quote;
  }

  center {
    display: block;
    /* special centering to be able to emulate the html4/netscape behaviour */
    text-align: -webkit-center;
  }

  hr {
    display: block;
    -webkit-margin-before: 0.5em;
    -webkit-margin-after: 0.5em;
    -webkit-margin-start: auto;
    -webkit-margin-end: auto;
    border-style: inset;
    border-width: 1px;
  }

  h1 {
    display: block;
    font-size: 2em;
    -webkit-margin-before: 0.67__qem;
    -webkit-margin-after: 0.67em;
    -webkit-margin-start: 0;
    -webkit-margin-end: 0;
    font-weight: bold;
  }

  :matches(article, aside, nav, section) h1 {
    font-size: 1.5em;
    -webkit-margin-before: 0.83__qem;
    -webkit-margin-after: 0.83em;
  }

  :matches(article, aside, nav, section) :matches(article, aside, nav, section) h1 {
    font-size: 1.17em;
    -webkit-margin-before: 1__qem;
    -webkit-margin-after: 1em;
  }

  :matches(article, aside, nav, section)
    :matches(article, aside, nav, section)
    :matches(article, aside, nav, section)
    h1 {
    font-size: 1em;
    -webkit-margin-before: 1.33__qem;
    -webkit-margin-after: 1.33em;
  }

  :matches(article, aside, nav, section)
    :matches(article, aside, nav, section)
    :matches(article, aside, nav, section)
    :matches(article, aside, nav, section)
    h1 {
    font-size: 0.83em;
    -webkit-margin-before: 1.67__qem;
    -webkit-margin-after: 1.67em;
  }

  :matches(article, aside, nav, section)
    :matches(article, aside, nav, section)
    :matches(article, aside, nav, section)
    :matches(article, aside, nav, section)
    :matches(article, aside, nav, section)
    h1 {
    font-size: 0.67em;
    -webkit-margin-before: 2.33__qem;
    -webkit-margin-after: 2.33em;
  }

  h2 {
    display: block;
    font-size: 1.5em;
    -webkit-margin-before: 0.83__qem;
    -webkit-margin-after: 0.83em;
    -webkit-margin-start: 0;
    -webkit-margin-end: 0;
    font-weight: bold;
  }

  h3 {
    display: block;
    font-size: 1.17em;
    -webkit-margin-before: 1__qem;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 0;
    -webkit-margin-end: 0;
    font-weight: bold;
  }

  h4 {
    display: block;
    -webkit-margin-before: 1.33__qem;
    -webkit-margin-after: 1.33em;
    -webkit-margin-start: 0;
    -webkit-margin-end: 0;
    font-weight: bold;
  }

  h5 {
    display: block;
    font-size: 0.83em;
    -webkit-margin-before: 1.67__qem;
    -webkit-margin-after: 1.67em;
    -webkit-margin-start: 0;
    -webkit-margin-end: 0;
    font-weight: bold;
  }

  h6 {
    display: block;
    font-size: 0.67em;
    -webkit-margin-before: 2.33__qem;
    -webkit-margin-after: 2.33em;
    -webkit-margin-start: 0;
    -webkit-margin-end: 0;
    font-weight: bold;
  }

  /* tables */

  table {
    display: table;
    border-collapse: separate;
    border-spacing: 2px;
    border-color: gray;
  }

  thead {
    display: table-header-group;
    vertical-align: middle;
    border-color: inherit;
  }

  tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
  }

  tfoot {
    display: table-footer-group;
    vertical-align: middle;
    border-color: inherit;
  }

  /* for tables without table section elements (can happen with XHTML or dynamically created tables) */
  table > tr {
    vertical-align: middle;
  }

  col {
    display: table-column;
  }

  colgroup {
    display: table-column-group;
  }

  tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
  }

  td,
  th {
    display: table-cell;
    vertical-align: inherit;
  }

  th {
    font-weight: bold;
  }

  caption {
    display: table-caption;
    text-align: -webkit-center;
  }

  /* lists */

  ul,
  menu,
  dir {
    display: block;
    list-style-type: disc;
    -webkit-margin-before: 1__qem;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 0;
    -webkit-margin-end: 0;
    -webkit-padding-start: 40px;
  }

  ol {
    display: block;
    list-style-type: decimal;
    -webkit-margin-before: 1__qem;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 0;
    -webkit-margin-end: 0;
    -webkit-padding-start: 40px;
  }

  li {
    display: list-item;
    text-align: -webkit-match-parent;
  }

  ul ul,
  ol ul {
    list-style-type: circle;
  }

  ol ol ul,
  ol ul ul,
  ul ol ul,
  ul ul ul {
    list-style-type: square;
  }

  dd {
    display: block;
    -webkit-margin-start: 40px;
  }

  dl {
    display: block;
    -webkit-margin-before: 1__qem;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 0;
    -webkit-margin-end: 0;
  }

  dt {
    display: block;
  }

  ol ul,
  ul ol,
  ul ul,
  ol ol {
    -webkit-margin-before: 0;
    -webkit-margin-after: 0;
  }

  /* form elements */

  form {
    display: block;
    margin-top: 0__qem;
  }

  label {
    cursor: default;
  }

  legend {
    display: block;
    -webkit-padding-start: 2px;
    -webkit-padding-end: 2px;
    border: none;
  }

  fieldset {
    display: block;
    -webkit-margin-start: 2px;
    -webkit-margin-end: 2px;
    -webkit-padding-before: 0.35em;
    -webkit-padding-start: 0.75em;
    -webkit-padding-end: 0.75em;
    -webkit-padding-after: 0.625em;
    border: 2px groove ThreeDFace;
    min-width: min-content;
  }

  u,
  ins {
    text-decoration: underline;
  }

  strong,
  b {
    font-weight: bold;
  }

  i,
  cite,
  em,
  var,
  address,
  dfn {
    font-style: italic;
  }

  tt,
  code,
  kbd,
  samp {
    font-family: monospace;
  }

  pre,
  xmp,
  plaintext,
  listing {
    display: block;
    font-family: monospace;
    white-space: pre;
    margin: 1__qem 0;
  }

  mark {
    background-color: yellow;
    color: black;
  }

  big {
    font-size: larger;
  }

  small {
    font-size: smaller;
  }

  s,
  strike,
  del {
    text-decoration: line-through;
  }

  sub {
    vertical-align: sub;
    font-size: smaller;
  }

  sup {
    vertical-align: super;
    font-size: smaller;
  }

  nobr {
    white-space: nowrap;
  }

  a:any-link {
    color: -webkit-link;
    text-decoration: underline;
    cursor: auto;
  }

  a:any-link:active {
    color: -webkit-activelink;
  }
`
