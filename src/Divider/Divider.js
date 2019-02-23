import React from 'react'
import {css} from '@emotion/core'
import createComponent, {renderNode} from '../createComponent'
import {BasicBox} from '../Box'
import {w, h, d, pos} from '../Box/CSS'
import * as defaultTheme from './defaultTheme'
import emptyObj from 'empty/object'


const as = 'div'
const defaultCSS = css`
  width: 100%;
  min-height: 1px;
  clear: both;
  ${pos.relative};
`
const SFC = createComponent({
  name: 'Divider',
  defaultTheme,
  themePath: 'divider'
})


export default React.forwardRef(
  function Divider (props = emptyObj, innerRef) {
    return SFC({
      innerRef,
      ...props,
      children: function (boxProps) {
        boxProps.children = function (nodeProps) {
          nodeProps.children = props.children
          nodeProps.as = nodeProps.as || as
          return renderNode(nodeProps, defaultCSS)
        }

        return BasicBox(boxProps)
      }
    })
  }

)
