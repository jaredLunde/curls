import createOptimized from 'react-cake/es/utils/createOptimized'
import createComponent from './createComponent'


export default function ({defaultNodeType = 'div', ...otherOpt}) {
  const SFC = createComponent(otherOpt)

  function SFCNode (props) {
    return SFC({
      ...props,
      children: function ({nodeType = defaultNodeType, ...sfcNodeProps}) {
        let children = props.children

        if (typeof children === 'function') {
          children = children(sfcNodeProps)
        }

        if (typeof nodeType === 'string') {
          sfcNodeProps.ref = sfcNodeProps.innerRef
          delete sfcNodeProps.innerRef
        }

        return createOptimized(nodeType, sfcNodeProps, children)
      }
    })
  }

  if (typeof process !== void 0 && process.env.NODE_ENV !== 'production') {
    SFCNode.displayName = otherOpt.name
  }

  return SFCNode
}
