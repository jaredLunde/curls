import React from 'react'
import {plugins as gridPlugins} from '../Grid/Grid'
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
  propTypes: Object.assign({}, flexPropTypes, propTypes),
  CSS: Object.assign({}, flexCSS, CSS),
  themePath: 'box',
  defaultTheme
})

export const GridBoxRenderProp = createComponent({
  name: 'GridBox',
  propTypes: Object.assign({}, gridPropTypes, flexPropTypes, propTypes),
  CSS: Object.assign({}, gridCSS, flexCSS, CSS),
  themePath: 'grid',
  defaultTheme: Object.assign({}, gridDefaultTheme, defaultTheme),
  plugins: gridPlugins
})

const createBoxComponent = SFC => (props, innerRef) => SFC({
  innerRef,
  ...props,
  children: function (boxProps) {
    boxProps.as = boxProps.as || 'div'
    boxProps.children = props.children
    return renderNodeFast(boxProps)
  }
})

export const GridBox = React.forwardRef(createBoxComponent(GridBoxRenderProp))
export default React.forwardRef(createBoxComponent(FlexBox))
