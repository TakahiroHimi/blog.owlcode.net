import { SerializedStyles } from '@emotion/react'
import Image from 'next/image'
import { VFC } from 'react'
import icon from './GitHubLinkIcon.icon.png'

type Props = {
  css?: SerializedStyles
}

const GitHubLinkIcon: VFC<Props> = ({ css }) => {
  return (
    <a href={'https://github.com/TakahiroHimi'} target="_blank" rel="noreferrer" css={css}>
      <Image src={icon} alt="GitHubロゴ画像" objectFit="contain" height={24} width={24} />
    </a>
  )
}

export default GitHubLinkIcon
