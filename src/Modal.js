import React, {useRef, useMemo, useContext} from 'react'
import {css} from '@emotion/core'
import {useStyles} from '@style-hooks/core'
import emptyObj from 'empty/object'
import useSwitch from '@react-hook/switch'
import createAriaPopupToggle from './createAriaPopupToggle'
import createAriaPopup from './createAriaPopup'
import {pushCss} from './utils'
import * as styles from './Drawer/styles'
import {useFade} from './Fade'

/**
import {Modal, ModalBox, ModalToggle, useFade} from 'curls'

<Modal transition={useFade}>
 <ModalBox p={3} bg='white'>
   <ModalToggle onClick={close}>
     Hide modal
   </ModalToggle>
 </ModalBox>

 <ModalToggle onClick={open}>
   Open Modal
 </ModalToggle>
</Modal>
**/
const defaultStyles = css`
  position: fixed;
  margin: auto;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
`

let ID = 0

export const ModalContext = React.createContext(emptyObj),
  {Consumer: ModalConsumer} = ModalContext,
  useModalContext = () => useContext(ModalContext),
  useModalFade = ({isOpen}) => useFade({visible: isOpen, duration: 'fast'}),
  useModalBox = props => {
    const context = useModalContext()
    props = useStyles('modal', styles, pushCss(props, [defaultStyles]))
    const transition = props.transition
    delete props.transition
    return pushCss(
      props,
      (transition || useModalFade)({isOpen: context.isOpen}).css
    )
  },
  ModalToggle = createAriaPopupToggle(useModalContext),
  ModalBox = createAriaPopup(useModalContext, useModalBox),
  Modal = ({open, initialOpen, children}) => {
    let [isOpen, toggle] = useSwitch(initialOpen)
    isOpen = open === void 0 || open === null ? isOpen : open
    const id = useRef(`curls.modal.${ID++}`)
    const context = useMemo(
      () => ({
        id: id.current,
        open: toggle.on,
        close: toggle.off,
        toggle,
        isOpen,
      }),
      [isOpen, toggle.on, toggle.off, toggle]
    )

    return (
      <ModalContext.Provider
        value={context}
        children={typeof children === 'function' ? children(context) : children}
      />
    )
  }

if (__DEV__) {
  const slidePropTypes = require('./Slide/propTypes').default
  Modal.displayName = 'Modal'
  ModalBox.displayName = 'ModalBox'
  Modal.propTypes = slidePropTypes
}
