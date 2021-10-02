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
  display: block;
  background-color: ${colors.blue200};
  color: ${colors.white};
  padding: 4px 8px;
  font-size: 1rem;
  border-radius: 2px;
  box-shadow: 1px 1px 1px #cccccccc;
  box-sizing: border-box;
`
