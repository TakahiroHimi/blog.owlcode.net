import { SerializedStyles } from '@emotion/react'
import Image from 'next/image'
import { VFC } from 'react'
import icon from './TwitterLinkIcon.icon.png'

type Props = {
  css?: SerializedStyles
}

const TwitterLinkIcon: VFC<Props> = ({ css }) => {
  return (
    <a href={'https://twitter.com/thim_tec'} target="_blank" rel="noreferrer" css={css}>
      <Image src={icon} alt="twitterロゴ画像" objectFit="contain" height={24} width={24} />
    </a>
  )
}

export default TwitterLinkIcon
