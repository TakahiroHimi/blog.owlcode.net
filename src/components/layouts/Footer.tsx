import { css } from '@emotion/react'
import Link from 'next/link'
import React, { VFC } from 'react'
import colors from 'styles/colors'

const Footer: VFC = () => {
  return (
    <footer>
      <nav>
        <Link href="/">
          <a css={link}>
            <span css={toHome}>blog.thimi.io</span>
          </a>
        </Link>
      </nav>
    </footer>
  )
}

export default Footer

const link = css`
  text-decoration: none;
  cursor: pointer;
  height: 54px;
  width: 100%;
  box-sizing: border-box;
  padding: 18px 0px;
  background-color: rgba(204, 204, 204, 0.2);
  text-align: center;
  position: absolute;
  bottom: 0px;
`

const toHome = css`
  color: ${colors.blue400};
  font-size: 18px;
  font-weight: bold;
  font-family: 'Roboto', 'Noto Sans JP', sans-serif;
`
