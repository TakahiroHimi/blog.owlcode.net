import { css } from '@emotion/react'
import React, { FC } from 'react'
import breakPoints from 'styles/breakPoints'
import Contents from './AsideCards/Contents'
import Profile from './AsideCards/Profile'
import ShareIcons from './ShareIcons'

type Props = {
  mdBody: string
  title: string
}

const ArticleAsideCard: FC<Props> = ({ mdBody, title }) => {
  return (
    <>
      <div css={profile}>
        <Profile />
      </div>
      <div css={contents}>
        <Contents mdBody={mdBody} />
      </div>
      <div css={shareIcons}>
        <ShareIcons title={title} />
      </div>
    </>
  )
}

export default ArticleAsideCard

const profile = css`
  @media screen and (max-width: ${breakPoints.lg}) {
    order: 2;
  }
`

const contents = css`
  @media screen and (max-width: ${breakPoints.lg}) {
    display: none;
  }
`

const shareIcons = css`
  @media screen and (max-width: ${breakPoints.lg}) {
    order: 1;
  }
`
