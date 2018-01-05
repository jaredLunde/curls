import React from 'react'
import {cx, css} from 'emotion'
import {createSFCNode} from '../utils'
import Box from '../Box'
import {flex, row, nowrap, align, justify} from '../Flex/CSS'
import propTypes from './propTypes'
import * as CSS from './CSS'


const themePath = 'navBar'
const NavBarSFC = createSFCNode({
  name: 'NavBar',
  CSS,
  propTypes,
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
  return Box({
    /*
    flex: true,
    row: true,
    nowrap: true,
    align: 'center',
    justify: 'left',
    */
    p: 'x2',
    className: cx(navCSS, className),
    ...props,
    children: function (sfcProps) {
      return NavBarSFC({...sfcProps, children})
    }
  })
}
