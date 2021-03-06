import React, {useRef} from 'react'
import useLayoutEffect from '@react-hook/passive-layout-effect'
import useMergedRef from '@react-hook/merged-ref'
import {createElement} from '@style-hooks/core'
import {createStyleHook} from '@style-hooks/core'
import {Button} from './Button'

export const useAriaPopupToggle = (props, context) => {
  const focusRef = useRef(null)
  const seen = useRef(false)

  useLayoutEffect(() => {
    if (context.isOpen === false) {
      if (seen.current === true) focusRef.current.focus()
      seen.current = true
    }
  }, [context.isOpen])

  const nextProps = Object.assign(
    {
      tabIndex: 0,
      'aria-controls': context.id,
      'aria-haspopup': 'true',
      'aria-expanded': String(context.isOpen),
      ref: focusRef,
    },
    props
  )

  nextProps.onClick = () => {
    props?.onClick?.()
    context.toggle()
  }

  return nextProps
}

export default (name, useContext) => {
  const useStylesHook = createStyleHook(name, {})
  return React.forwardRef((props, ref) => {
    const nextProps = useStylesHook(useAriaPopupToggle(props, useContext()))
    nextProps.ref = useMergedRef(ref, nextProps.ref)
    return createElement(Button, nextProps)
  })
}
