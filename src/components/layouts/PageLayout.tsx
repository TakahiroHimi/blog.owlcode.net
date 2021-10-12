import { css } from '@emotion/react'
import React, { ReactNode, VFC } from 'react'
import colors from 'styles/colors'
import Footer from './Footer'
import Header from './Header'

type Props = {
  children: ReactNode
}

const PageLayout: VFC<Props> = ({ children }) => {
  return (
    <React.Fragment>
      <main css={wrapper}>
        <Header />
        {children}
        <Footer />
      </main>
    </React.Fragment>
  )
}

export default PageLayout

const wrapper = css`
  background-color: ${colors.blue100}10;
  min-height: 100vh;
  position: relative;
  padding-bottom: 54px;
  box-sizing: border-box;
`
