import React, {useContext} from 'react'
import {css} from '@emotion/core'
import {useStyles, createElement} from '@style-hooks/core'
import emptyObj from 'empty/object'
import {portalize, pushCss, withChildren} from './utils'
import {useBox} from './Box'
import {Drop} from './Drop'

/**
import {Modal, ModalBox, ModalConsumer, Overlay} from 'curls'

<Modal transition={Fade}>
  {({show, hide, toggle, isVisible}) => (
    <>
      <ModalBox p={3} bg='white' withOverlay>
        {({show, hide, toggle, isVisible}) => (
          <Button onClick={hide}>
            Hide modal
          </Button>
        )}
      </ModalBox>

      <Button onClick={show}>
        Open Modal
      </Button>
    </>
  )}
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
  ModalBox = React.forwardRef(({children, portal, ...props}, ref) => {
    const transition = useModalContext()
    props.css = Array.isArray(transition.css)
      ? [...transition.css]
      : [transition.css]
    props = useBox(useModalBox(props))
    props.children = React.isValidElement(children)
      ? children
      : children(transition)
    props.ref = ref
    return portalize(createElement('div', props), portal)
  }),
  Modal = props =>
    React.createElement(
      props.transition || Drop,
      withChildren(props, transition => (
        <ModalContext.Provider
          value={transition}
          children={props.children(transition)}
        />
      ))
    )

if (__DEV__) {
  const slidePropTypes = require('./Slide/propTypes').default
  Modal.displayName = 'Modal'
  ModalBox.displayName = 'ModalBox'
  Modal.propTypes = slidePropTypes
}
