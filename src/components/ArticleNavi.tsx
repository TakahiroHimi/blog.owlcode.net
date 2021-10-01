import { css } from '@emotion/react'
import React, { VFC } from 'react'
import Card from './Card'
import Select from './Select'

const ArticleNavi: VFC = () => {
  return (
    <Card>
      <div css={container}>
        <Select
          placeholder="Tag"
          options={[
            { value: '0', label: 'React(15)' },
            { value: '1', label: 'Next.js(10)' },
            { value: '2', label: 'TypeScript(20)' },
          ]}
          isClearable
        ></Select>
        <Select
          placeholder="Date"
          options={[
            { value: '0', label: '2021/10(15)' },
            { value: '1', label: '2021/09(10)' },
            { value: '2', label: '2021/08(20)' },
          ]}
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
