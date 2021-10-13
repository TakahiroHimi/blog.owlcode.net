import { css } from '@emotion/react'
import { mdiClockTimeTwoOutline, mdiLeadPencil } from '@mdi/js'
import Icon from '@mdi/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { VFC } from 'react'
import breakPoints from 'styles/breakPoints'
import colors from 'styles/colors'
import { MetaData } from 'utils/types'
import Tag from './Tag'

type Props = {
  postsData: MetaData[]
}

const ArticleList: VFC<Props> = ({ postsData }) => {
  return (
    <div css={articlesContainer}>
      <section>
        <ul>
          {postsData.map(({ id, created, updated, title, visual, tags }) => (
            <li key={id} css={listItem}>
              <Link href={`/posts/${id}`}>
                <a css={imageWrapper}>
                  <figure css={image}>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_OGP_URL}/images/${visual || 'note'}.png`}
                      alt={visual}
                      layout="fill"
                    />
                  </figure>
                </a>
              </Link>

              <div>
                <Link href={`/posts/${id}`}>
                  <a css={titleText}>{title}</a>
                </Link>
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

                <div css={tagsContainer}>
                  {tags.map((tag) => (
                    <Link key={tag} href={`/tags/${tag}`}>
                      <a css={link}>
                        <Tag tag={tag} />
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default ArticleList

const articlesContainer = css`
  width: 100%;
`

const listItem = css`
  display: flex;
  padding: 16px;
  gap: 24px;

  &:not(:last-child) {
    border-bottom: 2px solid ${colors.gray100};
  }
`

const imageWrapper = css`
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const image = css`
  width: 100px;
  height: 100px;
  position: relative;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }

  @media screen and (max-width: ${breakPoints.lg}) {
    width: 50px;
    height: 50px;
  }
`

const link = css`
  text-decoration: none;
  cursor: pointer;
`

const titleText = css(
  link,
  css`
    font-size: 1.7rem;
    color: ${colors.blue400};

    &:hover {
      opacity: 0.7;
    }

    @media screen and (max-width: ${breakPoints.lg}) {
      font-size: 1.4rem;
    }
  `
)

const dateContainer = css`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`

const date = css`
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: ${colors.gray200};
  margin-bottom: 8px;
`

const tagsContainer = css`
  margin-top: 4px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`
