import createOptimized from 'react-cake/es/utils/createOptimized'
import createSFC from './createSFC'


export default function ({name, defaultNodeType = 'div', ...otherOpt}) {
  const SFC = createSFC({name, ...otherOpt})

  function SFCNode ({nodeType = defaultNodeType, children, innerRef, ...props}) {
    return SFC({
      ...props,
      children: function (sfcNodeProps) {
        sfcNodeProps = {ref: innerRef, ...sfcNodeProps}

        if (typeof children === 'function') {
          children = children(sfcNodeProps)
        }

        return createOptimized(nodeType, sfcNodeProps, children)
      }
    })
  }

  if (typeof process !== void 0 && process.env.NODE_ENV !== 'production') {
    SFCNode.displayName = name
  }

  return SFCNode
}
