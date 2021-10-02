import { css } from '@emotion/react'
import Profile from 'components/AsideCards/Profile'
import React, { ReactNode, VFC } from 'react'

type Props = {
  children: ReactNode
  asideCards?: ReactNode
  sticky?: boolean
}

const ContentsLayout: VFC<Props> = ({ children, asideCards, sticky = false }) => {
  return (
    <div css={wrapper}>
      <div css={childrenWrapper}>{children}</div>
      <aside css={sticky ? stickyContainer : asideContainer}>
        <Profile />
        {asideCards}
      </aside>
    </div>
  )
}

export default ContentsLayout

const wrapper = css`
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0px auto;
  padding: 32px;
  position: relative;
`

const childrenWrapper = css`
  width: 100%;
  max-width: 900px;
`

const asideContainer = css`
  width: 300px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const stickyContainer = css(
  asideContainer,
  css`
    position: sticky;
    top: 30px;
    max-height: calc(100vh - 120px);
  `
)
