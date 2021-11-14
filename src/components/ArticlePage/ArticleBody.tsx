/* eslint-disable react/no-children-prop */
import LinkCard from 'components/LinkCard'
import CodeBlock from 'components/md/CodeBlock'
import h2 from 'components/md/h2'
import h3 from 'components/md/h3'
import { OGPFetchResult } from 'ogp-fetcher'
import React, { FC } from 'react'
import ReactMarkdown from 'react-markdown'
import { ReactMarkdownProps } from 'react-markdown/src/ast-to-react'
import TweetEmbed from 'react-tweet-embed'
import rehypeRaw from 'rehype-raw'

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
    if (!href) return <a {...props} />

    // 文中に挿入されているリンクの場合はreturn
    if (node.position?.start.column !== 1) return <a {...props} />

    const tweetId = href.match(/https:\/\/twitter.com\/.*?\/status\/([0-9]*)/i)
    // Tweetの場合
    if (tweetId) {
      return <TweetEmbed id={tweetId[1]} options={{ conversation: 'none' }} />
    }

    const ogp = ogps?.find((ogp) => ogp.url === href)
    if (!ogp) return <a {...props} />
    const linkCardProps = {
      href: href,
      title: ogp['og:title'],
      desc: ogp['og:description'],
      src: ogp['og:image'],
      alt: ogp['og:image:alt'],
      siteName: ogp['og:site_name'],
      icon: ogp['icon'],
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
