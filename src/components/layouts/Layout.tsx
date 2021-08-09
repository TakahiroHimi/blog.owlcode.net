import { css } from '@emotion/react'
import Image from 'next/image'
import React, { ReactNode, VFC } from 'react'
import github from './github.png'
import Header from './Header/Header'
import twitter from './twitter.png'
import zenn from './zenn.png'

type Props = {
  children: ReactNode
}

const Layout: VFC<Props> = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <main css={wrapper}>
        <ul css={links}>
          <li>
            <a href={'https://github.com/TakahiroHimi'} target="_blank" rel="noreferrer">
              <Image src={github} alt="GitHubロゴ画像" objectFit="contain" height={30} width={30} />
            </a>
          </li>
          <li>
            <a href={'https://twitter.com/thim_tec'} target="_blank" rel="noreferrer">
              <Image
                src={twitter}
                alt="twitterロゴ画像"
                objectFit="contain"
                height={30}
                width={30}
              />
            </a>
          </li>
          <li>
            <a href={'https://zenn.dev/thim'} target="_blank" rel="noreferrer">
              <Image src={zenn} alt="zennロゴ画像" objectFit="contain" height={27} width={113} />
            </a>
          </li>
        </ul>
        <div css={container}>{children}</div>
      </main>
    </React.Fragment>
  )
}

export default Layout

const wrapper = css`
  background-color: rgba(165, 197, 214, 0.1);
  height: 100vh;
`

const links = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding-top: 8px;
`

const container = css`
  margin: 32px auto 0px;
  width: 90%;
  max-width: 960px;
`
