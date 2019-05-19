import React from 'react'
import * as styles from './styles'
import {useGrid} from '../Grid'
import * as flexStyles from '../Flex/styles'
import * as defaultTheme from './defaultTheme'
import propTypes from './propTypes'
import flexPropTypes from '../Flex/propTypes'
import createComponent, {renderNodeFast} from '../createComponent'
import useStyles from '../useStyles'


const basicBoxOptions = {name: 'box', styles, defaultTheme}
export const
  useBasicBox = props => useStyles(props, basicBoxOptions),
  BasicBox = createComponent(basicBoxOptions)

const flexBoxOptions = {name: 'box', styles: Object.assign({}, flexStyles, styles), defaultTheme}
export const
  useBox = props => useStyles(props, flexBoxOptions),
  FlexBox = createComponent(flexBoxOptions)

export const useGridBox = props => useBox(useGrid(props))

const createBoxComponent = (name, useHook) => (props, ref) => {
  props = useHook(props)
  props.ref = ref
  return renderNodeFast(props)
}

export const
  GridBox = React.forwardRef(createBoxComponent('GridBox', useGridBox)),
  Box = React.forwardRef(createBoxComponent('Box', useBox))

if (__DEV__) {
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