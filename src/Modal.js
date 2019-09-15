import React, {useContext} from 'react'
import {css} from '@emotion/core'
import {useStyles, createElement} from '@style-hooks/core'
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

export const ModalContext = React.createContext(emptyObj),
  {Consumer: ModalConsumer} = ModalContext,
  useModalContext = () => useContext(ModalContext),
  useModalBox = props =>
    useStyles('modal', emptyObj, pushCss(props, defaultStyles)),
  ModalToggle = React.forwardRef((props, ref) => {
    const context = useModalContext()
    props = Object.assign({ref}, props)
    props.onClick = context.toggle
    return createElement(Button, props)
  }),
  ModalBox = React.forwardRef(({children, portal, ...props}, ref) => {
    const transition = useModalContext()
    props.css = Array.isArray(transition.css)
      ? [...transition.css]
      : [transition.css]
    props = useBox(useModalBox(props))
    props.children =
      typeof children === 'function' ? children(transition) : children
    props.ref = ref
    return portalize(createElement('div', props), portal)
  }),
  Modal = props => {
    const context = (props.transition || useDrop)(props)
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
