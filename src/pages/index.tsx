import Date from 'components/date'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import React from 'react'
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
      <section>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this in{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section>
        <h2>Blog</h2>
        <ul>
          {allPostsData.map(({ id, created, title }) => (
            <li key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small>
                <Date dateString={created} />
              </small>
            </li>
          ))}
        </ul>
      </section>
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
