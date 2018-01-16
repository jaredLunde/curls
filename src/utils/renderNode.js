import {cx} from 'emotion'
import createOptimized from 'react-cake/es/utils/createOptimized'


export default function (nodeProps, defaultCSS) {
  const nodeType = nodeProps.nodeType
  delete nodeProps.nodeType
  let children = nodeProps.children

  if (typeof children === 'function') {
    children = children({...nodeProps})
  }
  
  if (typeof nodeType === 'string') {
    nodeProps.ref = nodeProps.innerRef
    delete nodeProps.innerRef
  }

  if (defaultCSS !== void 0) {
    nodeProps.className = cx(defaultCSS, nodeProps.className)
  }

  return createOptimized(nodeType, nodeProps, children)
}
