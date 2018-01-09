import React from 'react'
import {css, cx} from 'emotion'
import {createNode} from '../utils'
import Box from '../Box'
import {fw, db, pr, cb} from '../Box/CSS'
import propTypes from './propTypes'
import * as defaultTheme from './defaultTheme'
import * as CSS from './CSS'


const themePath = 'divider'
const defaultCSS = css`
  ${fw};
  ${db};
  ${pr};
  ${cb};
`
const DividerSFC = createNode({
  name: 'Divider',
  propTypes,
  CSS,
  defaultCSS,
  defaultTheme,
  themePath,
  defaultNodeType: 'div'
})
const emptyObj = {}

export default function Divider (dividerProps = emptyObj) {
  const {bg = null, thickness = null, ...props} = dividerProps

  return Box({
    ...props,
    children: function (sfcProps) {
      return DividerSFC({thickness, bg, ...sfcProps})
    }
  })
}
