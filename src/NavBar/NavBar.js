import React from 'react'
import {css} from '@emotion/core'
import createComponent, {renderNode} from '../createComponent'
import {GridBox} from '../Box'
import {flex, row, wrap, align, justify} from '../Flex/CSS'


const as = 'nav'
const defaultCSS = css`
  ${flex};
  ${row.row};
  ${wrap.no};
  ${align.center};
  ${justify.start};
`
const SFC = createComponent({name: 'NavBar', themePath: 'navBar'})


export default React.forwardRef(
  function NavBar (props, innerRef) {
    return SFC({
      innerRef,
      ...props,
      children: function (boxProps) {
        boxProps.children = function (nodeProps) {
          nodeProps.children = props.children
          nodeProps.as = nodeProps.as || as
          return renderNode(nodeProps, defaultCSS)
        }

        return GridBox(boxProps)
      }
    })
  }
)
