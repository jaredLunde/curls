import createOptimized from 'react-cake/es/utils/createOptimized'
import createSFC from './createSFC'


export default function ({defaultNodeType = 'div', ...otherOpt}) {
  const SFC = createSFC(otherOpt)

  function SFCNode (props) {
    return SFC({
      ...props,
      children: function ({...sfcNodeProps}) {
        delete sfcNodeProps.nodeType
        let children = props.children
        if (typeof children === 'function') {
          children = children(sfcNodeProps)
        }
        else if (typeof children === 'string') {
          sfcNodeProps.ref = props.innerRef
        }

        return createOptimized(
          props.nodeType || defaultNodeType,
          sfcNodeProps,
          children
        )
      }
    })
  }

  if (typeof process !== void 0 && process.env.NODE_ENV !== 'production') {
    SFCNode.displayName = otherOpt.name
  }

  return SFCNode
}
