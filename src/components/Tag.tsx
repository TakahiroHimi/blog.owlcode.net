import { css } from '@emotion/react'
import React, { VFC } from 'react'
import colors from 'styles/colors'

type Props = {
  tag: string
}

const Tag: VFC<Props> = ({ tag }) => {
  return <span css={wrapper}>{tag}</span>
}

export default Tag

const wrapper = css`
  background-color: ${colors.blue200};
  color: ${colors.white};
  padding: 2px 8px;
  font-size: 1rem;
`
