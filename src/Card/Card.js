import React from 'react'
import {css, cx} from 'emotion'
import {GridBox} from '../Box'
import {pr, fw} from '../Box/CSS'
import {flex, column} from '../Flex/CSS'
import {createNode, getComponentTheme, supportsCSS} from '../utils'
import * as defaultTheme from './defaultTheme'
import {br as cssBr} from './CSS'


const themePath = 'card'
const cardCSS = css`
  ${flex};
  ${column};
  ${pr};

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
    ${fw};
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
const SFC = createNode({
  name: 'Card',
  defaultTheme,
  themePath,
  defaultCSS: cardCSS,
  defaultNodeType: 'div'
})


export default function ({children, className, br, ...props}) {
  const theme = getComponentTheme(defaultTheme, props.theme, themePath)

  return GridBox({
    bg: theme.defaultBg,
    bw: theme.defaultBorderWidth,
    bc: theme.defaultBorderColor,
    bs: theme.defaultBoxShadow,
    className: cx(cssBr(br, theme), className),
    ...props,
    children: function (sfcProps) {
      return SFC({
        ...sfcProps,
        children
      })
    }
  })
}
