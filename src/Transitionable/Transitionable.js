import {useStyles} from '@style-hooks/core'
import * as styles from './styles'
import createRenderProp from '../createRenderProp'
import useSwitch from '../useSwitch'


const options = {name: 'transitionable', styles}
export const
  getDelay = (value, props) =>
    value === true
      ? props.enterDelay !== void 0
        ? props.enterDelay
        : props.delay
      : props.leaveDelay !== void 0
        ? props.leaveDelay
        : props.delay,
  useTransitionable = props => useStyles(props, options),
  useTransitionableToggle = (options, {initiallyVisible = false, visible, children, ...props}) => {
    const toggler = useSwitch(initiallyVisible, visible)
    props.property = options.transitionProperties
    props.show = toggler.on
    props.hide = toggler.off
    props.toggle = toggler.toggle
    props.isVisible = toggler.value
    props.delay = getDelay(toggler.value, props)
    const outProps = useTransitionable(useStyles(props, options))
    outProps.isVisible = toggler.value
    return outProps
  },
  Transitionable = createRenderProp(options)

if (__DEV__) {
  const propTypes = require('./propTypes').default
  Transitionable.displayName = 'Transitionable'
  Transitionable.propTypes = propTypes
}