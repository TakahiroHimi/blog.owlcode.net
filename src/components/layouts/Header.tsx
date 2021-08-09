import { css } from '@emotion/react'
import Link from 'next/link'
import React, { VFC } from 'react'
import colors from 'styles/colors'

const Header: VFC = () => {
  return (
    <header css={container}>
      <Link href="/aaaa">
        <a css={link}>
          <h1 css={h1}>blog.thimi.io</h1>
        </a>
      </Link>
    </header>
  )
}

export default Header

const container = css`
  background-color: ${colors.blue200};
`

const link = css`
  text-decoration: none;
  cursor: pointer;
`

const h1 = css`
  color: ${colors.white};
  text-align: center;
  padding: 64px 0px;
  background-image: linear-gradient(to top, ${colors.blue100} 0%, ${colors.blue200} 100%);
  font-size: 36px;
  font-weight: bold;
`
