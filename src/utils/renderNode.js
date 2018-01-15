import createOptimized from 'react-cake/es/utils/createOptimized'


export default function ({nodeType, ...nodeProps}) {
  let children = nodeProps.children

  if (typeof children === 'function') {
    children = children(nodeProps)
  }

  if (typeof nodeType === 'string') {
    nodeProps.ref = nodeProps.innerRef
    delete nodeProps.innerRef
  }

  return createOptimized(nodeType, nodeProps, children)
}
