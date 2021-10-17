import { HeadingComponent } from 'react-markdown/src/ast-to-react'

const h3: HeadingComponent = ({ node, ...props }) => {
  return <h3 id={node.position?.start.line.toString()}>{props.children}</h3>
}

export default h3
