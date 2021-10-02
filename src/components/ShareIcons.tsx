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

const Share: VFC<Props> = ({ title }) => {
  const router = useRouter()
  return (
    <div css={shareButtonsContainer}>
      <TwitterShareButton
        url={process.env.NEXT_PUBLIC_ROOT_URL + router.asPath}
        title={title}
        via={process.env.NEXT_PUBLIC_TWITTER_ID}
      >
        <div css={twitterIconWrapper}>
          <TwitterIcon size={40} />
        </div>
      </TwitterShareButton>
      <FacebookShareButton url={process.env.NEXT_PUBLIC_ROOT_URL + router.asPath}>
        <div css={facebookIconWrapper}>
          <FacebookIcon size={40} />
        </div>
      </FacebookShareButton>
      <HatenaShareButton url={process.env.NEXT_PUBLIC_ROOT_URL + router.asPath}>
        <div css={hatenaIconWrapper}>
          <HatenaIcon size={40} />
        </div>
      </HatenaShareButton>
    </div>
  )
}

export default Share

const shareButtonsContainer = css`
  display: flex;
  justify-content: stretch;
  margin: 0px auto;
  max-width: 300px;
`

const iconBase = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
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
