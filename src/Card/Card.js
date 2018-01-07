import React from 'react'
import {css, cx} from 'emotion'
import Box from '../Box'
import {pr, fw} from '../Box/CSS'
import {flex, column} from '../Flex/CSS'
import {createSFCNode, getComponentTheme, supportsCSS} from '../utils'
import defaultTheme from './defaultTheme'
import propTypes from './propTypes'
import {br as cssBr} from './CSS'


const themePath = 'card'
const SFC = createSFCNode({
  name: 'Card',
  defaultTheme,
  themePath,
  defaultNodeType: 'div'
})
const cardCSS = css`
  ${flex};
  ${column};
  ${pr};
  overflow: hidden;

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

export default function ({children, className, br, ...props}) {
  const theme = getComponentTheme(defaultTheme, props.theme, themePath)

  return Box({
    bg: theme.defaultBg,
    bw: theme.defaultBorderWidth,
    bc: theme.defaultBorderColor,
    bs: theme.defaultBoxShadow,
    className: cx(cardCSS, cssBr(br, theme), className),
    ...props,
    children: function (sfcProps) {
      return SFC({
        ...sfcProps,
        className: cx(cardCSS, sfcProps.className),
        children
      })
    }
  })
}
