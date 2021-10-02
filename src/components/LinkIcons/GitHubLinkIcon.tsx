import { css } from '@emotion/react'
import Image from 'next/image'
import { VFC } from 'react'
import icon from './GitHubLinkIcon.icon.png'

const GitHubLinkIcon: VFC = () => {
  return (
    <a href={'https://github.com/TakahiroHimi'} target="_blank" rel="noreferrer" css={iconLink}>
      <Image src={icon} alt="GitHubロゴ画像" objectFit="contain" height={24} width={24} />
    </a>
  )
}

export default GitHubLinkIcon

const iconLink = css`
  transition: opacity 0.1s;

  &:hover {
    opacity: 0.7;
  }
`
