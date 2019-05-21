import React from 'react'
import * as styles from './styles'
import * as defaultTheme from './defaultTheme'
import {useTransitionableToggle} from '../Transitionable'


const
  options = {name: 'slide', styles, defaultTheme, transitionProperties: 'visibility, transform'},
  useSlide = props => useTransitionableToggle(options, props),
  Slide = props => props.children(useSlide(props))

if (__DEV__) {
  const propTypes = require('./propTypes').default
  Slide.displayName = 'Slide'
  Slide.propTypes = propTypes
}

export {useSlide}
export default Slide