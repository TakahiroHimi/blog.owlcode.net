import { css } from '@emotion/react'
import { ReactNode, VFC } from 'react'
import colors from 'styles/colors'

type Props = {
  children: ReactNode
  overflow?: boolean
}

const Card: VFC<Props> = ({ children, overflow = false }) => {
  return <div css={overflow ? overflowWrapper : wrapper}>{children}</div>
}

export default Card

const wrapper = css`
  background-color: ${colors.blue10};
  padding: 20px;
  box-shadow: 1px 2px 2px #cccccccc;
  width: 100%;
  box-sizing: border-box;
  border-radius: 2px;
`

const overflowWrapper = css(
  wrapper,
  css`
    overflow: auto;
  `
)
