import createRenderProp from '../createRenderProp'
import {useTransitionableToggle} from '../Transitionable'
import * as styles from './styles'
import {Drop} from '../Drop'


const
  options = {name: 'slide', styles, transitionProperties: 'visibility, transform'}
export const
  useSlide = props => useTransitionableToggle(options, props),
  Slide = createRenderProp(useSlide)

Slide.defaultProps = {
  duration: 'normal'
}

if (__DEV__) {
  const propTypes = require('./propTypes').default
  Slide.displayName = 'Slide'
  Slide.propTypes = propTypes
}