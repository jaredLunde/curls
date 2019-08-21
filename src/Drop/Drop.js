import createRenderProp from '../createRenderProp'
import {useTransitionableToggle} from '../Transitionable'
import * as styles from './styles'

const options = {
  name: 'drop',
  styles,
  transitionProperties: 'visibility, transform, opacity',
}
export const useDrop = props => useTransitionableToggle(options, props),
  Drop = createRenderProp(useDrop)

if (__DEV__) {
  const propTypes = require('../Slide/propTypes').default
  Drop.displayName = 'Drop'
  Drop.propTypes = propTypes
}
