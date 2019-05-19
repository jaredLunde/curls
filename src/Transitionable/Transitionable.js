import propTypes from './propTypes'
import * as styles from './styles'
import * as defaultTheme from './defaultTheme'
import createComponent from '../createComponent'
import useStyles from '../useStyles'
import useToggleSwitch from '../useToggleSwitch'


const
  options = {name: 'transitionable', styles, defaultTheme},
  Transitionable = createComponent(options)
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
    const toggler = useToggleSwitch({value: visible, initialValue: initiallyVisible})
    props.property = options.transitionProperties
    props.show = toggler.on
    props.hide = toggler.off
    props.toggle = toggler.toggle
    props.isVisible = toggler.value
    props.delay = getDelay(toggler.value, props)
    const outProps = useTransitionable(useStyles(props, options))
    outProps.isVisible = toggler.value
    return outProps
  }

if (__DEV__) {
  Transitionable.displayName = 'Transitionable'
  Transitionable.propTypes = propTypes
}

export default Transitionable