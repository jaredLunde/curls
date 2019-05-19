import React from 'react'
import * as styles from './styles'
import propTypes from '../Slide/propTypes'
import * as defaultTheme from '../Slide/defaultTheme'
import {useTransitionableToggle} from '../Transitionable'


const
  options = {name: 'drop', styles, defaultTheme, transitionProperties: 'visibility, transform, opacity'},
  useDrop = props => useTransitionableToggle(options, props),
  Drop = props => props.children(useDrop(props))

if (__DEV__) {
  Drop.displayName = 'Drop'
  Drop.propTypes = propTypes
}

export {useDrop}
export default Drop