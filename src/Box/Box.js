import React from 'react'
import {plugins as gridPlugins} from '../Grid/Grid'
import * as styles from './styles'
import * as gridStyles from '../Grid/styles'
import * as flexStyles from '../Flex/styles'
import * as gridDefaultTheme from '../Grid/defaultTheme'
import * as defaultTheme from './defaultTheme'
import propTypes from './propTypes'
import gridPropTypes from '../Grid/propTypes'
import flexPropTypes from '../Flex/propTypes'
import createComponent, {renderNodeFast} from '../createComponent'


export const BasicBox = createComponent({name: 'box', styles, defaultTheme})
export const FlexBox = createComponent({
  name: 'box',
  styles: Object.assign({}, flexStyles, styles),
  defaultTheme
})
export const GridBoxRenderProp = createComponent({
  name: 'grid',
  styles: Object.assign({}, gridStyles, flexStyles, styles),
  defaultTheme: Object.assign({}, gridDefaultTheme, defaultTheme),
  plugins: gridPlugins
})

const createBoxComponent = (name, SFC) => {
  const Component = (props, innerRef) => SFC({
    ...props,
    children: boxProps => {
      boxProps.as = boxProps.as || 'div'
      boxProps.children = props.children
      boxProps.innerRef = innerRef
      return renderNodeFast(boxProps)
    }
  })

  if (__DEV__) {
    Component.displayName = name
  }

  return Component
}

export const GridBox = React.forwardRef(createBoxComponent('GridBox', GridBoxRenderProp))
const Box = React.forwardRef(createBoxComponent('Box', FlexBox))

BasicBox.propTypes /* remove-proptypes */ = propTypes
GridBox.propTypes /* remove-proptypes */ = Object.assign({}, gridPropTypes, flexPropTypes, propTypes)
Box.propTypes /* remove-proptypes */ = Object.assign({}, flexPropTypes, propTypes)
FlexBox.propTypes /* remove-proptypes */ = Box.propTypes

export default Box