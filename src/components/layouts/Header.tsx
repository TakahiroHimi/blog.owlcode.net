import { css } from '@emotion/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { VFC } from 'react'
import colors from 'styles/colors'
import owl from './Header.owl.png'

const Header: VFC = () => {
  return (
    <header>
      <Link href="/">
        <a css={link}>
          <div css={container}>
            <h1 css={h1}>{process.env.NEXT_PUBLIC_BLOG_TITLE}</h1>
            <div css={imageWrapper}>
              <Image src={owl} alt="owl" />
            </div>
          </div>
        </a>
      </Link>
    </header>
  )
}

export default Header

const link = css`
  text-decoration: none;
  cursor: pointer;
`

const container = css`
  background-color: ${colors.blue400}CC;
  position: relative;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const h1 = css`
  color: ${colors.white};
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  font-family: 'Roboto', 'Noto Sans JP', sans-serif;
  z-index: 1;
`

const imageWrapper = css`
  width: 180px;
  position: absolute;
  transform: translate(0px, -15px);
  top: 0;
  right: 0;
  z-index: 0;
`
