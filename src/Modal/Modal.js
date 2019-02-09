import React from 'react'
import {css, ClassNames} from '@emotion/core'
import emptyObj from 'empty/object'
import {portalize} from '../utils'
import Overlay from '../Overlay'
import {FlexBox} from '../Box'
import {maxZIndex} from '../browser'
import createComponent, {renderNode} from '../createComponent'
import Drop from '../Drop'
import * as defaultTheme from './defaultTheme'

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

const {Consumer, Provider} = React.createContext(emptyObj)
const SFC = createComponent({name: 'Modal', defaultTheme, themePath: 'modal'})
const as = 'div'
const defaultCSS = css`
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  ${maxZIndex};
`

export const ModalConsumer = Consumer
export const ModalBox = React.forwardRef(
  function ModalBox (
    {children, portal, withOverlay = false, ...props},
    innerRef
  ) {
    return (
      <Consumer children={
        function ({css, ...transitionProps}) {
          const boxChild =
            typeof children === 'function' ? children(transitionProps) : children

          let Component = SFC({
            ...props,
            css: [css, props.className],
            children: sfcProps => FlexBox({
              ...sfcProps,
              children: function (boxProps) {
                boxProps.as = boxProps.as || as
                boxProps.children = boxChild
                boxProps.innerRef = innerRef
                return renderNode(boxProps, defaultCSS)
              }
            })
          })

          if (withOverlay === true) {
            Component = <Overlay visible={transitionProps.isVisible} children={Component}/>
          }

          return portalize(Component, portal)
        }
      }/>
    )
  }
)

export default function Modal (props) {
  return (props.transition || Drop)({
    ...props,
    children: dropProps => <Provider value={dropProps} children={
      props.children(dropProps)
    }/>
  })
}
