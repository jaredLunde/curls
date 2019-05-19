import React from 'react'
import propTypes from './propTypes'
import * as styles from './styles'
import {useTransitionableToggle} from '../Transitionable'


const
  options = {name: 'fade', styles, transitionProperties: 'visibility, opacity'},
  useFade = props => {
    props = Object.assign({}, props)
    props.from = props.from || 0
    props.to = props.to === void 0 ? 1 : props.to
    return useTransitionableToggle(options, props)
  },
  Fade = props => props.children(useFade(props))

if (__DEV__) {
  Fade.displayName = 'Fade'
  Fade.propTypes = propTypes
}

export {useFade}
export default Fade