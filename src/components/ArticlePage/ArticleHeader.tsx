import { css } from '@emotion/react'
import { mdiClockTimeTwoOutline, mdiLeadPencil } from '@mdi/js'
import Icon from '@mdi/react'
import Tag from 'components/Tag'
import Image from 'next/image'
import React, { VFC } from 'react'
import breakPoints from 'styles/breakPoints'
import colors from 'styles/colors'
import { MetaData } from 'utils/types'

type Props = Pick<MetaData, 'created' | 'updated' | 'title' | 'visual' | 'tags'>

const ArticleHeader: VFC<Props> = ({ created, updated, title, visual, tags }) => {
  return (
    <>
      <div css={imageWrapper}>
        <Image
          src={`${process.env.NEXT_PUBLIC_OGP_URL}/images/${visual || 'Note'}.png`}
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
    </>
  )
}

export default ArticleHeader

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

  @media screen and (max-width: ${breakPoints.lg}) {
    font-size: 1.8rem;
  }
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
