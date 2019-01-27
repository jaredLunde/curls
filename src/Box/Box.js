import React from 'react'
import gridPropTypes from '../Grid/propTypes'
import * as gridCSS from '../Grid/CSS'
import * as gridDefaultTheme from '../Grid/defaultTheme'
import flexPropTypes from '../Flex/propTypes'
import * as flexCSS from '../Flex/CSS'
import propTypes from './propTypes'
import * as CSS from './CSS'
import * as defaultTheme from './defaultTheme'
import createComponent, {renderNodeFast} from '../createComponent'


export const BasicBox = createComponent({
  name: 'BasicBox',
  propTypes,
  CSS,
  themePath: 'box',
  defaultTheme
})

export const FlexBox = createComponent({
  name: 'Box',
  propTypes: {...flexPropTypes, ...propTypes},
  CSS: {...flexCSS, ...CSS},
  themePath: 'box',
  defaultTheme
})

export const GridBox = createComponent({
  name: 'GridBox',
  propTypes: {...gridPropTypes, ...flexPropTypes, ...propTypes},
  CSS: {...gridCSS, ...flexCSS, ...CSS},
  themePath: 'box',
  defaultTheme: {...gridDefaultTheme, ...defaultTheme}
})


export default React.forwardRef(
  function Box (props, innerRef) {
    return FlexBox({
      innerRef,
      ...props,
      children: function (boxProps) {
        boxProps.as = boxProps.as || 'div'
        boxProps.children = props.children
        return renderNodeFast(boxProps)
      }
    })
  }
)
