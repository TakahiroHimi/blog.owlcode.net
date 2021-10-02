import { css } from '@emotion/react'
import Card from 'components/Card'
import ShareIcons from 'components/ShareIcons'
import React, { VFC } from 'react'
import { MetaData } from 'utils/types'

type Props = Pick<MetaData, 'title'>

const Share: VFC<Props> = ({ title }) => {
  return (
    <Card>
      <div css={container}>
        <p css={cardTitle}>Share</p>
        <ShareIcons title={title} />
      </div>
    </Card>
  )
}

export default Share

const container = css`
  display: flex;
  flex-direction: column;
`

const cardTitle = css`
  font-weight: 600;
  margin-bottom: 16px;
  font-size: 1.2rem;
`
