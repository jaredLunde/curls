import React, {useRef, useContext} from 'react'
import {css} from '@emotion/core'
import {useStyles, createElement} from '@style-hooks/core'
import useLayoutEffect from '@react-hook/passive-layout-effect'
import useMergedRef from '@react-hook/merged-ref'
import emptyObj from 'empty/object'
import {Button} from './Button'
import {portalize, pushCss} from './utils'
import {useBox} from './Box'
import {useDrop} from './Drop'

/**
import {Modal, ModalBox, ModalToggle, useFade} from 'curls'

<Modal transition={useFade}>
 <ModalBox p={3} bg='white'>
   <ModalToggle onClick={hide}>
     Hide modal
   </ModalToggle>
 </ModalBox>

 <ModalToggle onClick={show}>
   Open Modal
 </ModalToggle>
</Modal>
**/
const defaultStyles = css`
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  z-index: 1000;
`

let ID = 0
export const ModalContext = React.createContext(emptyObj),
  {Consumer: ModalConsumer} = ModalContext,
  useModalContext = () => useContext(ModalContext),
  useModalBox = props => {
    const context = useModalContext()
    props = useStyles(
      'modal',
      emptyObj,
      pushCss(props, [defaultStyles, context.css])
    )
    props.id = props.id || context.id
    props.tabIndex = props.tabIndex || '0'
    return props
  },
  ModalToggle = React.forwardRef((props, ref) => {
    const context = useModalContext()
    props = Object.assign(
      {
        tabIndex: 0,
        'aria-controls': context.id,
        'aria-haspopup': 'true',
        'aria-expanded': String(context.isVisible),
        ref,
      },
      props
    )
    props.onClick = context.toggle
    return createElement(Button, props)
  }),
  ModalBox = React.forwardRef(({children, portal, ...props}, ref) => {
    const context = useModalContext()
    const focusRef = useRef(null)

    useLayoutEffect(() => {
      if (context.isVisible) setTimeout(() => focusRef.current.focus(), 100)
    }, [context.isVisible])

    props = useBox(useModalBox(props))
    props.children =
      typeof children === 'function' ? children(context) : children
    props.ref = useMergedRef(ref, focusRef)
    return portalize(createElement('div', props), portal)
  }),
  Modal = props => {
    const context = (props.transition || useDrop)(props)
    context.id = useRef(`curls.modal.${ID++}`).current
    return (
      <ModalContext.Provider
        value={context}
        children={
          typeof props.children === 'function'
            ? props.children(context)
            : props.children
        }
      />
    )
  }

if (__DEV__) {
  const slidePropTypes = require('./Slide/propTypes').default
  Modal.displayName = 'Modal'
  ModalBox.displayName = 'ModalBox'
  Modal.propTypes = slidePropTypes
}
