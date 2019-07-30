import createRenderProp from '../createRenderProp'
import {useTransitionableToggle} from '../Transitionable'
import * as styles from './styles'


const
  options = {name: 'slide', styles, transitionProperties: 'visibility, transform'}
export const
  useSlide = props => useTransitionableToggle(options, props),
  Slide = createRenderProp(useSlide)

if (__DEV__) {
  const propTypes = require('./propTypes').default
  Slide.displayName = 'Slide'
  Slide.propTypes = propTypes
}