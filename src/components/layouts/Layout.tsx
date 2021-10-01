import { css } from '@emotion/react'
import ArticleNavi from 'components/ArticleNavi'
import Profile from 'components/Profile'
import React, { ReactNode, VFC } from 'react'
import Footer from './Footer'
import Header from './Header'

type Props = {
  children: ReactNode
}

const Layout: VFC<Props> = ({ children }) => {
  return (
    <React.Fragment>
      <main css={wrapper}>
        <Header />

        <div css={contentsContainer}>
          <div css={childrenWrapper}>{children}</div>
          <aside css={asideContainer}>
            <Profile />
            <ArticleNavi />
          </aside>
        </div>

        <Footer />
      </main>
    </React.Fragment>
  )
}

export default Layout

const wrapper = css`
  background-color: rgba(165, 197, 214, 0.1);
  min-height: 100vh;
  position: relative;
  padding-bottom: 54px;
  box-sizing: border-box;
`

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
