import useSwitch from './useSwitch'
import {getDelay, useTransitionable} from './Transitionable'


export default (
  useTransition,
  // eslint-disable-next-line no-unused-vars
  {initiallyVisible = false, visible, children, ...props}
) => {
  const toggler = useSwitch(initiallyVisible, visible)
  props.isVisible = toggler.value
  props.delay = getDelay(toggler.value, props)
  return {
    show: toggler.on,
    hide: toggler.off,
    toggle: toggler.toggle,
    isVisible: toggler.value,
    css: useTransitionable(useTransition(props)).css
  }
}