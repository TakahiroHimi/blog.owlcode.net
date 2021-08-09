import { css } from '@emotion/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { VFC } from 'react'
import colors from 'styles/colors'
import github from './github.png'
import twitter from './twitter.png'
import zenn from './zenn.png'

const Header: VFC = () => {
  return (
    <header>
      <Link href="/">
        <a css={link}>
          <h1 css={h1}>blog.thimi.io</h1>
        </a>
      </Link>
      <ul css={links}>
        <li>
          <a href={'https://github.com/TakahiroHimi'} target="_blank" rel="noreferrer">
            <Image src={github} alt="GitHubロゴ画像" objectFit="contain" height={30} width={30} />
          </a>
        </li>
        <li>
          <a href={'https://twitter.com/thim_tec'} target="_blank" rel="noreferrer">
            <Image src={twitter} alt="twitterロゴ画像" objectFit="contain" height={30} width={30} />
          </a>
        </li>
        <li>
          <a href={'https://zenn.dev/thim'} target="_blank" rel="noreferrer">
            <Image src={zenn} alt="zennロゴ画像" objectFit="contain" height={27} width={113} />
          </a>
        </li>
      </ul>
    </header>
  )
}

export default Header

const link = css`
  text-decoration: none;
  cursor: pointer;
`

const h1 = css`
  color: ${colors.white};
  text-align: center;
  padding: 64px 0px;
  background-image: linear-gradient(to top, ${colors.blue50} 0%, ${colors.blue200} 100%);
  font-size: 36px;
  font-weight: bold;
`

const links = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 8px;
`
