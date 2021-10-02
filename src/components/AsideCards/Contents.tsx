/* eslint-disable react/no-children-prop */
import { css } from '@emotion/react'
import React, { VFC } from 'react'
import ReactMarkdown from 'react-markdown'
import { HeadingComponent } from 'react-markdown/src/ast-to-react'
import colors from 'styles/colors'
import Card from '../Card'

type Props = {
  mdBody: string
}

const ankerLink: HeadingComponent = ({ node, ...props }) => {
  return (
    <a href={'#' + node.position?.start.line.toString()} css={node.tagName === 'h2' ? h2 : h3}>
      {props.children}
    </a>
  )
}

const Contents: VFC<Props> = ({ mdBody }) => {
  return (
    <Card>
      <div css={container}>
        <p css={title}>目次</p>
        <ReactMarkdown
          children={mdBody}
          allowedElements={['h2', 'h3']}
          components={{ h2: ankerLink, h3: ankerLink }}
        />
      </div>
    </Card>
  )
}

export default Contents

const h2 = css`
  text-decoration: none;
  color: ${colors.black};
  font-weight: 600;
  font-size: 1rem;
  margin-top: 8px;
`

const h3 = css`
  text-decoration: none;
  color: ${colors.black};
  font-size: 0.9rem;
  margin-top: 4px;
`

const container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const title = css`
  font-weight: 600;
  margin-bottom: 4px;
  font-size: 1.2rem;
`
