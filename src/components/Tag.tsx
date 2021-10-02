import { css } from '@emotion/react'
import Link from 'next/link'
import React, { VFC } from 'react'
import colors from 'styles/colors'

type Props = {
  tag: string
}

const Tag: VFC<Props> = ({ tag }) => {
  return (
    <Link href={`/tags/${tag}`}>
      <a css={link}>
        <span css={wrapper}>{tag}</span>
      </a>
    </Link>
  )
}

export default Tag

const link = css`
  text-decoration: none;
`

const wrapper = css`
  display: block;
  background-color: ${colors.blue200};
  color: ${colors.white};
  padding: 4px 8px;
  font-size: 1rem;
  border-radius: 2px;
  box-shadow: 1px 1px 1px #cccccccc;
  box-sizing: border-box;
  cursor: pointer;
`
