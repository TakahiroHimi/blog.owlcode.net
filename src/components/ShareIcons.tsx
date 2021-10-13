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
      <div css={twitterIconWrapper}>
        <TwitterShareButton
          url={process.env.NEXT_PUBLIC_ROOT_URL + router.asPath}
          title={title}
          via={process.env.NEXT_PUBLIC_TWITTER_ID}
        >
          <TwitterIcon size={40} />
        </TwitterShareButton>
      </div>

      <div css={facebookIconWrapper}>
        <FacebookShareButton url={process.env.NEXT_PUBLIC_ROOT_URL + router.asPath}>
          <FacebookIcon size={40} />
        </FacebookShareButton>
      </div>

      <div css={hatenaIconWrapper}>
        <HatenaShareButton url={process.env.NEXT_PUBLIC_ROOT_URL + router.asPath}>
          <HatenaIcon size={40} />
        </HatenaShareButton>
      </div>
    </div>
  )
}

export default ShareIcons

const shareButtonsContainer = css`
  display: flex;
  justify-content: stretch;
  margin: 0px auto;
  width: 100%;
`

const iconBase = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  transition: opacity 0.1s;

  &:hover {
    opacity: 0.8;
  }
`

const twitterIconWrapper = css(
  iconBase,
  css`
    background-color: rgb(0, 172, 237);
    border-radius: 2px 0px 0px 2px;
  `
)

const facebookIconWrapper = css(
  iconBase,
  css`
    background-color: rgb(59, 89, 152);
  `
)

const hatenaIconWrapper = css(
  iconBase,
  css`
    background-color: rgb(0, 154, 217);
    border-radius: 0px 2px 2px 0px;
  `
)
