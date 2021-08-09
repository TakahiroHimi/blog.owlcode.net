import { css } from '@emotion/react'
import Tag from 'components/Tag'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import colors from 'styles/colors'
import { getSortedPostsData } from '../lib/posts'

export default function Home({
  allPostsData,
}: {
  allPostsData: {
    id: string
    created: string
    updated: string
    title: string
    visual: string
    tags: string[]
  }[]
}) {
  return (
    <React.Fragment>
      <Head>
        <title>blog.thimi.io</title>
      </Head>
      <section>
        <ul>
          {allPostsData.map(({ id, created, title, tags }) => (
            <li key={id} css={listItem}>
              <p css={createdAt}>{created}</p>
              <Link href={`/posts/${id}`}>
                <a css={titleText}>{title}</a>
              </Link>
              <div css={tagsContainer}>
                {tags.map((tag) => (
                  <Link key={tag} href={`/tags/${tag}`}>
                    <a css={link}>
                      <Tag tag={tag} />
                    </a>
                  </Link>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>
      <nav></nav>
    </React.Fragment>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData,
    },
  }
}

const listItem = css`
  margin-bottom: 32px;
`

const createdAt = css`
  font-size: 1rem;
  color: ${colors.gray200};
  margin-bottom: 8px;
`

const titleText = css`
  font-size: 1.7rem;
  color: ${colors.blue400};
  text-decoration: none;
  cursor: pointer;
  display: block;
  margin-bottom: 8px;
`

const tagsContainer = css`
  display: flex;
  gap: 8px;
`

const link = css`
  text-decoration: none;
  cursor: pointer;
`
