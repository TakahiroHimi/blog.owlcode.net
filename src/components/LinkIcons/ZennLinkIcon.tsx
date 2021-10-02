import { css } from '@emotion/react'
import Image from 'next/image'
import { VFC } from 'react'
import icon from './ZennLinkIcon.icon.svg'

const ZennLinkIcon: VFC = () => {
  return (
    <a href={'https://zenn.dev/thim'} target="_blank" rel="noreferrer" css={iconLink}>
      <Image src={icon} alt="zennロゴ画像" objectFit="contain" height={24} width={24} />
    </a>
  )
}

export default ZennLinkIcon

const iconLink = css`
  transition: opacity 0.1s;

  &:hover {
    opacity: 0.7;
  }
`
