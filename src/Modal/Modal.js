import React from 'react'
import {css} from 'emotion'
import emptyObj from 'empty/object'
import Portalize from 'react-portalize'
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
const nodeType = 'div'
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
    {children, portal = false, withOverlay = false, ...props},
    innerRef
  ) {
    return <Consumer children={
      function ({className, ...transitionProps}) {
        const boxChild =
          typeof children === 'function' ? children(transitionProps) : children

        let Component = SFC({
          className,
          ...props,
          children: sfcProps => FlexBox({
            ...sfcProps,
            children: function (boxProps) {
              boxProps.nodeType = boxProps.nodeType || nodeType
              boxProps.children = boxChild
              boxProps.innerRef = innerRef
              return renderNode(boxProps, defaultCSS)
            }
          })
        })

        if (withOverlay === true) {
          Component = <Overlay visible={transitionProps.isVisible} children={Component}/>
        }

        return (
          portal === false
            ? Component
            : <Portalize
                children={Component}
                entry={typeof portal === 'function' ? portal : void 0}
              />
        )
      }
    }/>
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
