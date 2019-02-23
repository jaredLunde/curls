import React from 'react'
import {css} from '@emotion/core'
import {pos} from '../Box/CSS'
import {flex, row, wrap} from '../Flex/CSS'
import {FlexBox} from '../Box'
import createComponent, {renderNode} from '../createComponent'


const as = 'div'
const defaultCSS = css`
  width: 100%;
  ${pos.relative};
  ${flex};
  ${row.row};
  ${wrap.wrap};
`
const SFC = createComponent({name: 'Row', themePath: 'row'})


export default React.forwardRef(
  function Row (props, innerRef) {
    return SFC({
      innerRef,
      ...props,
      children: function (boxProps) {
        boxProps.children = function (nodeProps) {
          nodeProps.children = props.children
          nodeProps.as = nodeProps.as || as
          return renderNode(nodeProps, defaultCSS)
        }

        return FlexBox(boxProps)
      }
    })
  }
)
