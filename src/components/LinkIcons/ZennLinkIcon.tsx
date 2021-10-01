import { SerializedStyles } from '@emotion/react'
import Image from 'next/image'
import { VFC } from 'react'
import icon from './ZennLinkIcon.icon.svg'

type Props = {
  css?: SerializedStyles
}

const ZennLinkIcon: VFC<Props> = ({ css }) => {
  return (
    <a href={'https://zenn.dev/thim'} target="_blank" rel="noreferrer" css={css}>
      <Image src={icon} alt="zennロゴ画像" objectFit="contain" height={24} width={24} />
    </a>
  )
}

export default ZennLinkIcon
