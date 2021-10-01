import { css } from '@emotion/react'
import { MonthCount } from 'lib/date'
import { TagCount } from 'lib/tags'
import React, { VFC } from 'react'
import Card from './Card'
import Select from './Select'

type Props = {
  tagCount: TagCount[]
  monthCount: MonthCount[]
}

const ArticleNavi: VFC<Props> = ({ tagCount, monthCount }) => {
  return (
    <Card>
      <div css={container}>
        <Select
          placeholder="Tag"
          options={tagCount.map((tag) => {
            return { value: tag.tag, label: `${tag.tag}(${tag.count})` }
          })}
          isClearable
        ></Select>
        <Select
          placeholder="Date"
          options={monthCount.map((month) => {
            return { value: month.month, label: `${month.month}(${month.count})` }
          })}
          isClearable
        ></Select>
      </div>
    </Card>
  )
}

export default ArticleNavi

const container = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
`
