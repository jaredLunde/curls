import React from 'react'
import reduceProps from 'react-cake/es/utils/reduceProps'
import {styled, cx, css} from 'emotion'
import {createSFCNode, mergeThemeDefaults} from '../utils'
import {FlexBox} from '../Box'
import propTypes from './propTypes'
import defaultTheme from './defaultTheme'
import {dividerColor} from './utils'
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


export default function Divider (dividerProps = {}) {
  const {className, ...props} = dividerProps

  return FlexBox({
    fw: true,
    db: true,
    pr: true,
    cb: true,
    ...props,
    children: function ({className, ...sfcProps}) {
      // merges the default colors and sizes to the theme
      const theme = mergeThemeDefaults({
        defaultTheme,
        themePath,
        props: sfcProps,
        defaults: ['defaultColor']
      })
      // adds color class and removes colors from the props
      className = cx(dividerColor(sfcProps, theme), className)
      sfcProps = reduceProps(sfcProps, theme.colors)

      return DividerSFC({thickness: null, ...sfcProps, className})
    }
  })
}
