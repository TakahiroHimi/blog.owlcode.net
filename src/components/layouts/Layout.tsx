import { css } from '@emotion/react'
import React, { ReactNode, VFC } from 'react'
import Header from './Header/Header'

type Props = {
  children: ReactNode
}

const Layout: VFC<Props> = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <main css={container}>{children}</main>
    </React.Fragment>
  )
}

export default Layout

const container = css`
  margin: 32px auto 64px;
  width: 90%;
  max-width: 960px;
`
