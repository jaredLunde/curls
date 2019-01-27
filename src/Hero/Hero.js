import React from 'react'
import {css} from '@emotion/core'
import FillViewport from '../FillViewport'
import {FlexBox} from '../Box'
import {flex, column, align, justify} from '../Flex/CSS'
import {w, pos, ov} from '../Box/CSS'
import createComponent, {renderNode} from '../createComponent'
import {getStyle} from './utils'


const as = 'div'
const defaultCSS = css`
  ${flex};
  ${column.column};
  ${align.center};
  ${justify.center};
  ${w('100%')};
  ${pos.relative};
  ${ov.touch};
`
const SFC = createComponent({name: 'Hero', themePath: 'hero'})


export default React.forwardRef(
  function Hero (props, innerRef) {
    return SFC({
      innerRef,
      ...props,
      children: function (vpProps) {
        return FillViewport({
          children: function ({style}) {
            vpProps.children = function (nodeProps) {
              nodeProps.children = props.children
              nodeProps.as = nodeProps.as || as
              nodeProps.style = {
                ...getStyle(style, nodeProps.trimHeight),
                ...vpProps.style
              }
              delete nodeProps.trimHeight
              return renderNode(nodeProps, defaultCSS)
            }

            return FlexBox(vpProps)
          }
        })
      }
    })
  }
)
