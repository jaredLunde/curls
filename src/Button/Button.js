import React from 'react'
import {css} from '@emotion/core'
import {FlexBox} from '../Box'
import {flex, row, align, justify} from '../Flex/CSS'
import createComponent, {renderNode} from '../createComponent'
import propTypes from './propTypes'
import * as CSS from './CSS'
import * as defaultTheme from './defaultTheme'
import './global.css'


const as = 'button'
const defaultCSS = css`
  ${flex};
  ${row.row};
  ${align.center};
  ${justify.center};
`
const SFC = createComponent({
  name: 'Button',
  propTypes,
  CSS,
  defaultTheme,
  themePath: 'button'
})

export default React.forwardRef(
  function Button ({className, ...props}, innerRef) {
    return SFC({
      __buttonStyles: true,
      innerRef,
      ...props,
      children: function (boxProps) {
        // this is done so css in defaultTheme.sizes can be overridden
        const sfcClassName = boxProps.className
        // this is done so css in defaultTheme.sizes can be overridden
        boxProps.className = className
        boxProps.children = function (nodeProps) {
          nodeProps.children = props.children
          nodeProps.as = nodeProps.as || as

          return renderNode(nodeProps, [defaultCSS, sfcClassName])
        }

        return FlexBox(boxProps)
      }
    })
  }
)
