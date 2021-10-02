import { css } from '@emotion/react'
import Card from 'components/Card'
import Tag from 'components/Tag'
import React, { VFC } from 'react'
import { MetaData } from 'utils/types'

type Props = Pick<MetaData, 'tags'>

const TagList: VFC<Props> = ({ tags }) => {
  return (
    <Card>
      <div css={container}>
        <p css={title}>Tags</p>
        <ul css={tagsContainer}>
          {tags.map((tag) => (
            <li key={tag}>
              <Tag tag={tag} />
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}

export default TagList

const container = css`
  width: 100%;
`

const title = css`
  font-weight: 600;
  margin-bottom: 16px;
  font-size: 1.2rem;
`

const tagsContainer = css`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 8px;
`
