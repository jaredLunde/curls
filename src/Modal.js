import React, {useRef, useContext} from 'react'
import {css} from '@emotion/core'
import {useStyles} from '@style-hooks/core'
import emptyObj from 'empty/object'
import createAriaPopupToggle from './createAriaPopupToggle'
import createAriaPopup from './createAriaPopup'
import {pushCss} from './utils'
import {useDrop} from './Drop'
import * as styles from './Drawer/styles'

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
    props = useStyles('modal', styles, pushCss(props, [defaultStyles]))
    return props
  },
  ModalToggle = createAriaPopupToggle(useModalContext),
  ModalBox = createAriaPopup(useModalContext, useModalBox),
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
