import React from 'react'
import * as styles from './styles'
import {useGrid} from '../Grid'
import * as flexStyles from '../Flex/styles'
import * as defaultTheme from './defaultTheme'
import createElement from '../createElement'
import createComponent from '../createComponent'
import useStyles from '../useStyles'


const basicBoxOptions = {name: 'box', styles, defaultTheme}
export const
  useBasicBox = props => useStyles(props, basicBoxOptions),
  BasicBox = createComponent(basicBoxOptions)

const flexBoxOptions = {name: 'box', styles: Object.assign({}, flexStyles, styles), defaultTheme}
export const
  useBox = props => useStyles(props, flexBoxOptions),
  FlexBox = createComponent(flexBoxOptions),
  useGridBox = props => useBox(useGrid(props))

const createBoxComponent = (name, useHook) => React.forwardRef(
  (props, ref) => {
    props = useHook(props)
    props.ref = ref
    return createElement('div', props)
  }
)

export const
  GridBox = createBoxComponent('GridBox', useGridBox),
  Box = createBoxComponent('Box', useBox)

if (__DEV__) {
  const
    propTypes = require('./propTypes').default,
    flexPropTypes = require('../Flex/propTypes').default
  Box.displayName = 'Box'
  GridBox.displayName = 'GridBox'
  FlexBox.displayName = 'FlexBox'
  BasicBox.displayName = 'BasicBox'
  BasicBox.propTypes = propTypes
  GridBox.propTypes = Object.assign({}, flexPropTypes, propTypes)
  Box.propTypes = Object.assign({}, flexPropTypes, propTypes)
  FlexBox.propTypes = Box.propTypes
}

export default Box