import useSwitch from './useSwitch'
import {useTransitionable} from './Transitionable'

export const getDelay = (value, props) =>
  value === true
    ? props.enterDelay !== void 0
      ? props.enterDelay
      : props.delay
    : props.leaveDelay !== void 0
    ? props.leaveDelay
    : props.delay

export default (
  useTransition,
  // eslint-disable-next-line no-unused-vars
  {initiallyVisible = false, visible, ...props}
) => {
  const toggler = useSwitch(initiallyVisible, visible)
  props.isVisible = toggler.value
  props.delay = getDelay(toggler.value, props)
  return {
    show: toggler.on,
    hide: toggler.off,
    toggle: toggler.toggle,
    isVisible: toggler.value,
    css: useTransitionable(useTransition(props)).css,
  }
}
