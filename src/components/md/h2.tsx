import { HeadingComponent } from 'react-markdown/src/ast-to-react'

const h2: HeadingComponent = ({ node, ...props }) => {
  return <h2 id={node.position?.start.line.toString()}>{props.children}</h2>
}

export default h2
