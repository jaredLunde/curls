import React from 'react'
import {css, cx} from 'emotion'
import {createSFCNode} from '../utils'
import {FlexBox} from '../Box'
import {fw, db, pr, cb} from '../Box/CSS'
import propTypes from './propTypes'
import defaultTheme from './defaultTheme'
import * as CSS from './CSS'


const themePath = 'divider'
const DividerSFC = createSFCNode({
  name: 'Divider',
  propTypes,
  CSS,
  defaultTheme,
  themePath,
  defaultNodeType: 'div'
})
const dividerCSS = css`
  ${fw};
  ${db};
  ${pr};
  ${cb};
`

export default function Divider (dividerProps = {}) {
  const {bg = null, thickness = null, className, ...props} = dividerProps

  return FlexBox({
    className: cx(dividerCSS, className),
    ...props,
    children: function (sfcProps) {
      return DividerSFC({thickness, bg, ...sfcProps})
    }
  })
}
