import React from 'react'
import {cx, css} from 'emotion'
import {createNode, getComponentTheme} from '../utils'
import {GridBox} from '../Box'
import {flex, row, wrap, align, justify} from '../Flex/CSS'
import propTypes from './propTypes'
import * as CSS from './CSS'
import * as defaultTheme from './defaultTheme'


const themePath = 'navBar'
const navCSS = css`
  ${flex};
  ${row.row};
  ${wrap.no};
  ${align.center};
  ${justify.start};
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

  return GridBox({
    bg: theme.defaultBg,
    bw: theme.defaultBorderWidth,
    bc: theme.defaultBorderColor,
    sh: theme.defaultBoxShadow,
    ...props,
    children: function (sfcProps) {
      sfcProps.children = props.children
      return SFC(sfcProps)
    }
  })
}
