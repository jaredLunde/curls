import React, {useContext} from 'react'
import {css} from '@emotion/core'
import emptyObj from 'empty/object'
import {portalize, withChildren} from '../utils'
import Overlay from '../Overlay'
import {useBox} from '../Box'
import {MAX_Z_INDEX} from '../browser'
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
  defaultCSS = css`
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    z-index: ${MAX_Z_INDEX};
  `,
  options = {name: 'modal', defaultTheme},
  ModalContext = React.createContext(emptyObj),
  {Consumer, Provider} = ModalContext

export const
  ModalConsumer = Consumer,
  useModal = () => useContext(ModalContext),
  ModalBox = React.forwardRef(
    ({children, portal, withOverlay = false, ...props}, ref) => {
      props = useBox(useStyles(props, options))
      const transition = useModal()
      props.children = typeof children === 'function' ? children(transition) : children
      props.css = props.css ? [transition.css, props.css] : transition.css
      props.ref = ref
      let Component = createElement('div', props, defaultCSS)
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
  Modal.propTypes = slidePropTypes
}

export default Modal
