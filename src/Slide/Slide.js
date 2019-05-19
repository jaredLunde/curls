import React from 'react'
import propTypes from './propTypes'
import * as styles from './styles'
import * as defaultTheme from './defaultTheme'
import {useTransitionableToggle} from '../Transitionable'


const
  options = {name: 'slide', styles, defaultTheme, transitionProperties: 'visibility, transform'},
  useSlide = props => useTransitionableToggle(options, props),
  Slide = props => props.children(useSlide(props))

if (__DEV__) {
  Slide.displayName = 'Slide'
  Slide.propTypes = propTypes
}

export {useSlide}
export default Slide