import React from 'react'
import {css} from '@emotion/core'
import {GridBoxRenderProp} from '../Box/Box'
import {pos} from '../Box/CSS'
import {grow} from '../Flex/CSS'
import createComponent, {renderNode} from '../createComponent'


const defaultCSS = css`
  min-width: 0;
  ${grow(true)};
  ${pos.relative};
`
const as = 'div'
const SFC = createComponent({name: 'Col', themePath: 'col'})

export default React.forwardRef(
  function Col (props, innerRef) {
    return SFC({
      innerRef,
      ...props,
      children: function (boxProps) {
        boxProps.useFlex = true
        boxProps.children = function (nodeProps) {
          nodeProps.children = props.children
          nodeProps.as = nodeProps.as || as
          return renderNode(nodeProps, defaultCSS)
        }

        return GridBoxRenderProp(boxProps)
      }
    })
  }

)
