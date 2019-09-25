import React, {useRef, useMemo, useContext} from 'react'
import {css} from '@emotion/core'
import {useStyles} from '@style-hooks/core'
import emptyObj from 'empty/object'
import createAriaPopupToggle from './createAriaPopupToggle'
import createAriaPopup from './createAriaPopup'
import {pushCss} from './utils'
import * as styles from './Drawer/styles'
import useSwitch from './useSwitch'
import {useFade} from './Fade'

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
  useModalFade = ({isOpen}) => useFade({visible: isOpen, from: 0, to: 1}),
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
  Modal = ({open, children}) => {
    const toggle = useSwitch(false, open)
    const id = useRef(`curls.modal.${ID++}`)
    const context = useMemo(
      () => ({
        id: id.current,
        show: toggle.on,
        hide: toggle.off,
        toggle: toggle.toggle,
        isOpen: toggle.value,
      }),
      [toggle.on, toggle.off, toggle.toggle, toggle.value]
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
