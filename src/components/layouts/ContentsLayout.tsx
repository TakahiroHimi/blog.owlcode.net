import { css } from '@emotion/react'
import Profile from 'components/Profile'
import Tag from 'components/Tag'
import Link from 'next/link'
import React, { ReactNode, VFC } from 'react'
import colors from 'styles/colors'
import { MetaData } from 'utils/types'

type Props = {
  postsData: MetaData[]
  asideCards?: ReactNode
}

const ContentsLayout: VFC<Props> = ({ postsData, asideCards }) => {
  return (
    <div css={wrapper}>
      <div css={articlesContainer}>
        <section>
          <ul>
            {postsData.map(({ id, created, title, tags }) => (
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
      </div>
      <aside css={asideContainer}>
        <Profile />
        {asideCards}
      </aside>
    </div>
  )
}

export default ContentsLayout

const wrapper = css`
  display: flex;
  max-width: 960px;
  margin: 0px auto;
  padding: 32px 0px 32px;
`

const articlesContainer = css`
  width: 100%;
`

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
`

const tagsContainer = css`
  margin-top: 8px;
  display: flex;
  gap: 8px;
`

const link = css`
  text-decoration: none;
  cursor: pointer;
`

const asideContainer = css`
  width: 300px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`
