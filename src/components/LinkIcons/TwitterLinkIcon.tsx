import { css } from '@emotion/react'
import Image from 'next/image'
import { VFC } from 'react'
import icon from './TwitterLinkIcon.icon.png'

const TwitterLinkIcon: VFC = () => {
  return (
    <a href={'https://twitter.com/thim_tec'} target="_blank" rel="noreferrer" css={iconLink}>
      <Image src={icon} alt="twitterロゴ画像" objectFit="contain" height={24} width={24} />
    </a>
  )
}

export default TwitterLinkIcon

const iconLink = css`
  transition: opacity 0.1s;

  &:hover {
    opacity: 0.7;
  }
`
