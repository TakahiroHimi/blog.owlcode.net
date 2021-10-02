import { css } from '@emotion/react'
import { ReactNode, VFC } from 'react'
import colors from 'styles/colors'

type Props = {
  children: ReactNode
}

const Card: VFC<Props> = ({ children }) => {
  return <div css={wrapper}>{children}</div>
}

export default Card

const wrapper = css`
  background-color: ${colors.white};
  padding: 20px;
  box-shadow: 1px 2px 2px #cccccccc;
  width: 100%;
  box-sizing: border-box;
  border-radius: 2px;
`
