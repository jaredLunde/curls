import {useStyles} from '@style-hooks/core'
import createRenderProp from '../createRenderProp'
import useSwitch from '../useSwitch'
import * as styles from './styles'


export const
  getDelay = (value, props) =>
    value === true
      ? props.enterDelay !== void 0
        ? props.enterDelay
        : props.delay
      : props.leaveDelay !== void 0
        ? props.leaveDelay
        : props.delay,
  useTransitionable = props => useStyles('transitionable', styles, Object.assign({duration: 'normal'}, props)),
  useTransitionableToggle = (options, {initiallyVisible = false, visible, children, ...props}) => {
    const toggler = useSwitch(initiallyVisible, visible)
    props.property = options.transitionProperties
    props.show = toggler.on
    props.hide = toggler.off
    props.toggle = toggler.toggle
    props.isVisible = toggler.value
    props.delay = getDelay(toggler.value, props)
    const outProps = useTransitionable(useStyles(options.name, options.styles, props))
    outProps.isVisible = toggler.value
    return outProps
  },
  Transitionable = createRenderProp(useTransitionable)

if (__DEV__) {
  const propTypes = require('./propTypes').default
  Transitionable.displayName = 'Transitionable'
  Transitionable.propTypes = propTypes
}