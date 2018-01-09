import React from 'react'
import {cx, css} from 'emotion'
import {createNode, getComponentTheme} from '../utils'
import Box from '../Box'
import {flex, row, nowrap, align, justify} from '../Flex/CSS'
import propTypes from './propTypes'
import * as CSS from './CSS'
import defaultTheme from './defaultTheme'


const themePath = 'navBar'
const navCSS = css`
  ${flex};
  ${row};
  ${nowrap};
  ${align.center};
  ${justify.left};
`
const SFC = createNode({
  name: 'NavBar',
  CSS,
  propTypes,
  defaultTheme,
  defaultCSS: navCSS,
  defaultNodeType: 'nav'
})


export default function NavBar (props) {
  const theme = getComponentTheme(defaultTheme, props.theme, themePath)

  return Box({
    bg: theme.defaultBg,
    bw: theme.defaultBorderWidth,
    bc: theme.defaultBorderColor,
    bs: theme.defaultBoxShadow,
    ...props,
    children: function (sfcProps) {
      sfcProps.children = props.children
      return SFC(sfcProps)
    }
  })
}
