import React from 'react'
import {css} from '@emotion/core'
import {FlexBox} from '../Box'
import {pos, w} from '../Box/CSS'
import {flex, column} from '../Flex/CSS'
import createComponent, {renderNode} from '../createComponent'
import * as defaultTheme from './defaultTheme'
import propTypes from './propTypes'
import * as CSS from './CSS'


const defaultCSS = css`
  ${flex};
  ${column.column};
  ${pos.relative};
  min-width: 0;

  & > *:not(.button):not(button):not([role=button]):first-child {
    border-top: 0;
  }

  & > *:not(.button):not(button):not([role=button]):last-child {
    border-bottom: 0;
  }

  & > *:first-child {
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
  }

  & > *:last-child {
    border-bottom-width: 0;
    border-left-width: 0;
    border-right-width: 0;
  }

  & > * {
    width: 100%;
  }

  & > img,
  & > figure,
  & > video {
    width: 100%;
    height: auto;
    margin: 0 auto;
    padding: 0;
    display: block;
  }
`


const as = 'div'
const SFC = createComponent({
  name: 'Card',
  propTypes,
  CSS,
  defaultTheme,
  themePath: 'card'
})


export default React.forwardRef(
  function Card (props, innerRef) {
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
