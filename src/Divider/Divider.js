import React from 'react'
import {css, cx} from 'emotion'
import {createSFCNode} from '../utils'
import {FlexBox} from '../Box'
import {fw, db, pr, cb} from '../Box/CSS'
import propTypes from './propTypes'
import defaultTheme from './defaultTheme'
import * as CSS from './CSS'


const themePath = 'divider'
const defaultCSS = css`
  ${fw};
  ${db};
  ${pr};
  ${cb};
`
const DividerSFC = createSFCNode({
  name: 'Divider',
  propTypes,
  CSS,
  defaultCSS,
  defaultTheme,
  themePath,
  defaultNodeType: 'div'
})


export default function Divider (dividerProps = {}) {
  const {bg = null, thickness = null, ...props} = dividerProps

  return FlexBox({
    ...props,
    children: function (sfcProps) {
      return DividerSFC({thickness, bg, ...sfcProps})
    }
  })
}
