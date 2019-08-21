import createRenderProp from '../createRenderProp'
import {useTransitionableToggle} from '../Transitionable'
import * as styles from './styles'

const options = {
  name: 'fade',
  styles,
  transitionProperties: 'visibility, opacity',
}
export const useFade = props => {
    props = Object.assign({}, props)
    props.from = props.from || 0
    props.to = props.to === void 0 ? 1 : props.to
    return useTransitionableToggle(options, props)
  },
  Fade = createRenderProp(useFade)

if (__DEV__) {
  const propTypes = require('./propTypes').default
  Fade.displayName = 'Fade'
  Fade.propTypes = propTypes
}
