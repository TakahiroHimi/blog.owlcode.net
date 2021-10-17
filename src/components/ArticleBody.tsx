/* eslint-disable react/no-children-prop */
import { OGPFetchResult } from 'ogp-fetcher'
import React, { FC } from 'react'
import ReactMarkdown from 'react-markdown'
import { ReactMarkdownProps } from 'react-markdown/src/ast-to-react'
import rehypeRaw from 'rehype-raw'
import LinkCard from './LinkCard'
import CodeBlock from './md/CodeBlock'
import h2 from './md/h2'
import h3 from './md/h3'

type Props = {
  mdBody: string
  ogps: OGPFetchResult
}

const ArticleBody: FC<Props> = ({ mdBody, ogps }) => {
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
  )
}

export default ArticleBody
