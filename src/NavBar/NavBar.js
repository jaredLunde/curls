import React from 'react'
import {cx, css} from 'emotion'
import {createSFCNode, getComponentTheme} from '../utils'
import Box from '../Box'
import {flex, row, nowrap, align, justify} from '../Flex/CSS'
import propTypes from './propTypes'
import * as CSS from './CSS'
import defaultTheme from './defaultTheme'


const themePath = 'navBar'
const NavBarSFC = createSFCNode({
  name: 'NavBar',
  CSS,
  propTypes,
  defaultTheme,
  defaultNodeType: 'nav'
})

const navCSS = css`
  ${flex}
  ${row}
  ${nowrap}
  ${align.center}
  ${justify.left}
  & > :not(div):not(table):not(nav):not(ul):not(ol) {
    padding: 1rem;
  }
`

export default function NavBar ({children, className, ...props}) {
  const theme = getComponentTheme(defaultTheme, props.theme, themePath)

  return Box({
    bg: theme.defaultBg,
    bw: theme.defaultBorderWidth,
    bc: theme.defaultBorderColor,
    bs: theme.defaultBoxShadow,
    p: 'x2',
    className: cx(navCSS, className),
    ...props,
    children: function (sfcProps) {
      return NavBarSFC({...sfcProps, children})
    }
  })
}
