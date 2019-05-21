import React from 'react'
import * as styles from './styles'
import * as defaultTheme from '../Slide/defaultTheme'
import {useTransitionableToggle} from '../Transitionable'


const
  options = {name: 'drop', styles, defaultTheme, transitionProperties: 'visibility, transform, opacity'},
  useDrop = props => useTransitionableToggle(options, props),
  Drop = props => props.children(useDrop(props))

if (__DEV__) {
  const propTypes = require('../Slide/propTypes').default
  Drop.displayName = 'Drop'
  Drop.propTypes = propTypes
}

export {useDrop}
export default Drop