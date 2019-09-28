import React, {useRef} from 'react'
import useLayoutEffect from '@react-hook/passive-layout-effect'
import useMergedRef from '@react-hook/merged-ref'
import {useBox} from './Box'
import {portalize, pushCss} from './utils'
import {createElement} from '@style-hooks/core'

export const useAriaPopup = (props, context) => {
  const focusRef = useRef(null)

  useLayoutEffect(() => {
    // handles closing the modal when the ESC key is pressed
    if (context.isOpen) {
      setTimeout(() => focusRef.current.focus(), 100)
      const callback = event =>
        parseInt(event.keyCode) === 27 && context.close()
      focusRef.current.addEventListener('keyup', callback)
      return () => focusRef.current.removeEventListener('keyup', callback)
    }
  }, [context.isOpen])

  props.tabIndex = 0
  props.id = props.id || context.id
  props.children =
    typeof children === 'function' ? props.children(context) : props.children
  props.ref = focusRef
  return pushCss(props, context.css)
}

export default (useContext, usePopupBox) =>
  React.forwardRef(({portal, ...props}, ref) => {
    const nextProps = useAriaPopup(useBox(usePopupBox(props)), useContext())
    nextProps.ref = useMergedRef(ref, nextProps.ref)
    return portalize(createElement('div', nextProps), portal)
  })
