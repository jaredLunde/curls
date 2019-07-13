import React, {useContext} from 'react'
import {css} from '@emotion/core'
import emptyObj from 'empty/object'
import {portalize, withChildren} from '../utils'
import Overlay from '../Overlay'
import {useBox} from '../Box'
import createElement from '../createElement'
import Drop from '../Drop'
import * as defaultTheme from './defaultTheme'
import useStyles from '../useStyles'


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
const
  defaultStyles = css`
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    z-index: 1000;
  `,
  options = {name: 'modal', defaultStyles, defaultTheme},
  ModalContext = React.createContext(emptyObj),
  {Consumer, Provider} = ModalContext

export const
  ModalConsumer = Consumer,
  useModalContext = () => useContext(ModalContext),
  useModalBox = props => useStyles(props, options),
  ModalBox = React.forwardRef(
    ({children, portal, withOverlay = false, ...props}, ref) => {
      props = useBox(useModalBox(props))
      const transition = useModalContext()
      props.children = typeof children === 'function' ? children(transition) : children
      props.css = props.css ? [transition.css, props.css] : transition.css
      props.ref = ref
      let Component = createElement('div', props)
      if (withOverlay === true)
        Component = <Overlay
          visible={transition.isVisible}
          children={Component}
        />
      return portalize(Component, portal)
    }
  ),
  Modal = props => (props.transition || Drop)(
    withChildren(
      props,
      transition => <Provider value={transition} children={props.children(transition)}/>
    )
  )

if (__DEV__) {
  const slidePropTypes = require('../Slide/propTypes').default
  Modal.displayName = 'Modal'
  ModalBox.displayName = 'ModalBox'
  Modal.propTypes = slidePropTypes
}

export default Modal
