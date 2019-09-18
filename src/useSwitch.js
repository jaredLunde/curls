import {useState, useCallback} from 'react'

export default (initialValue, controlledValue) => {
  const [value, setValue] = useState(
      controlledValue === void 0 ? initialValue : controlledValue
    ),
    on = useCallback(() => setValue(true), []),
    off = useCallback(() => setValue(false), []),
    toggle = useCallback(() => setValue(value => value === false), [value])
  return {
    value: controlledValue === void 0 ? value : controlledValue,
    on,
    off,
    toggle,
  }
}
