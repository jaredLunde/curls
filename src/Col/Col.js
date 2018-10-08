import React from 'react'
import {css} from 'emotion'
import {GridBox} from '../Box'
import {pos} from '../Box/CSS'
import {grow} from '../Flex/CSS'
import createComponent, {renderNode} from '../createComponent'


const defaultCSS = css`
  min-width: 0;
  ${grow(true)};
  ${pos.relative};
`
const nodeType = 'div'
const SFC = createComponent({name: 'Col', themePath: 'col'})



export default React.forwardRef(
  function Col (props, innerRef) {
    return SFC({
      innerRef,
      ...props,
      children: function (boxProps) {
        boxProps.children = function (nodeProps) {
          nodeProps.children = props.children
          nodeProps.nodeType = nodeProps.nodeType || nodeType
          return renderNode(nodeProps, defaultCSS)
        }

        return GridBox(boxProps)
      }
    })
  }

)
