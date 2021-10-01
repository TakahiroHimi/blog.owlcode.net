import { css } from '@emotion/react'
import Profile from 'components/Profile'
import React, { ReactNode, VFC } from 'react'

type Props = {
  children: ReactNode
  asideCards?: ReactNode
}

const ContentsLayout: VFC<Props> = ({ children, asideCards }) => {
  return (
    <div css={contentsContainer}>
      <div css={childrenWrapper}>{children}</div>
      <aside css={asideContainer}>
        <Profile />
        {asideCards}
      </aside>
    </div>
  )
}

export default ContentsLayout

const contentsContainer = css`
  display: flex;
  max-width: 960px;
  margin: 0px auto;
  padding: 32px 0px 32px;
`

const childrenWrapper = css`
  width: 100%;
`

const asideContainer = css`
  width: 300px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`
