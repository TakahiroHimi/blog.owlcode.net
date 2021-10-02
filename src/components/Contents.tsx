/* eslint-disable react/no-children-prop */
import { css } from '@emotion/react'
import React, { VFC } from 'react'
import ReactMarkdown from 'react-markdown'
import { HeadingComponent } from 'react-markdown/src/ast-to-react'
import colors from 'styles/colors'
import Card from './Card'

type Props = {
  mdBody: string
}

const ankerLink: HeadingComponent = ({ node, ...props }) => {
  return <a href={'#' + node.position?.start.line.toString()}>{props.children}</a>
}

const Contents: VFC<Props> = ({ mdBody }) => {
  return (
    <Card>
      <div css={container}>
        <p css={title}>目次</p>
        <ReactMarkdown children={mdBody} allowedElements={['h2']} components={{ h2: ankerLink }} />
      </div>
    </Card>
  )
}

export default Contents

const container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;

  a {
    text-decoration: none;
    color: ${colors.black};
    font-weight: 600;
  }
`

const title = css`
  font-weight: 600;
  margin-bottom: 16px;
  font-size: 1.2rem;
`
