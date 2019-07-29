import {useCallback} from 'react'
import useToggle from '@react-hook/toggle'


export default (initialValue, controlledValue) => {
  const
    [value, toggle] = useToggle(controlledValue === void 0 ? initialValue : controlledValue),
    on = useCallback(() => value === false && toggle(), [value, toggle]),
    off = useCallback(() => value === true && toggle(), [value, toggle])
  return {value: controlledValue === void 0 ? value : controlledValue, on, off, toggle}
}