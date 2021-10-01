import { css } from '@emotion/react'
import { MonthCount } from 'lib/date'
import { TagCount } from 'lib/tags'
import { useRouter } from 'next/dist/client/router'
import React, { VFC } from 'react'
import Card from './Card'
import Select from './Select'

type Props = {
  tagCount: TagCount[]
  monthCount: MonthCount[]
}

const ArticleNavi: VFC<Props> = ({ tagCount, monthCount }) => {
  const router = useRouter()
  const selectTag = router.query.tag
  const selectTagCount = tagCount.find((value) => value.tag === selectTag)?.count
  const selectMonth = router.query.month
  const selectMonthCount = monthCount.find((value) => value.month === selectMonth)?.count

  return (
    <Card>
      <div css={container}>
        <Select
          placeholder="Tag"
          options={tagCount.map((tag) => {
            return { value: tag.tag, label: `${tag.tag}(${tag.count})` }
          })}
          isClearable
          onChange={(e) => {
            if (e === null) {
              router.push('/')
            } else if ('value' in e) {
              router.push(`/tags/${e.value}`)
            }
          }}
          defaultValue={
            typeof selectTag === 'string'
              ? { value: selectTag, label: `${selectTag}(${selectTagCount})` }
              : undefined
          }
        />
        <Select
          placeholder="Date"
          options={monthCount.map((month) => {
            return { value: month.month, label: `${month.month}(${month.count})` }
          })}
          isClearable
          onChange={(e) => {
            if (e === null) {
              router.push('/')
            } else if ('value' in e) {
              router.push(`/month/${e.value}`)
            }
          }}
          defaultValue={
            typeof selectMonth === 'string'
              ? { value: selectMonth, label: `${selectMonth}(${selectMonthCount})` }
              : undefined
          }
        />
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
