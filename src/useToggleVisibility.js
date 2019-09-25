import useSwitch from '@react-hook/switch'
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
  let [isVisible, toggle] = useSwitch(initiallyVisible)
  isVisible = visible === void 0 || visible === null ? isVisible : visible
  props.isVisible = isVisible
  props.delay = getDelay(isVisible, props)
  return {
    show: toggle.on,
    hide: toggle.off,
    toggle,
    isVisible,
    css: useTransitionable(useTransition(props)).css,
  }
}
