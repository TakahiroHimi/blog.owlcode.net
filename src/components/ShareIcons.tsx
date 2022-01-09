import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import React, { VFC } from 'react'
import {
  FacebookIcon,
  FacebookShareButton,
  HatenaIcon,
  HatenaShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share'
import { MetaData } from 'utils/types'

type Props = Pick<MetaData, 'title'>

const ShareIcons: VFC<Props> = ({ title }) => {
  const router = useRouter()
  return (
    <div css={shareButtonsContainer}>
      <TwitterShareButton
        url={process.env.NEXT_PUBLIC_ROOT_URL + router.asPath}
        title={title}
        via={process.env.NEXT_PUBLIC_TWITTER_ID}
      >
        <TwitterIcon size={40} />
      </TwitterShareButton>

      <FacebookShareButton url={process.env.NEXT_PUBLIC_ROOT_URL + router.asPath}>
        <FacebookIcon size={40} />
      </FacebookShareButton>

      <HatenaShareButton url={process.env.NEXT_PUBLIC_ROOT_URL + router.asPath}>
        <HatenaIcon size={40} />
      </HatenaShareButton>
    </div>
  )
}

export default ShareIcons

const shareButtonsContainer = css`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin: 0px auto;
  width: 100%;
`
