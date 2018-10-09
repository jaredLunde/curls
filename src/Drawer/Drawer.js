import React from 'react'
import Portalize from 'react-portalize'
import emptyObj from 'empty/object'
import {css, cx} from 'emotion'
import {maxZIndex} from '../browser'
import {FlexBox} from '../Box'
import Slide from '../Slide'
import createComponent, {renderNode} from '../createComponent'
import {d, pos, ov, h} from '../Box/CSS'
import * as CSS from './CSS'


/**
<Drawer fromBottom>
  {({toggle, isVisible}) => {
    return (
      <>
        <DrawerBox portal bg='black'>
          {({isVisible, hide}) => {
            return (
              <Type>
                Is visible? {String(isVisible)}

                <Button onClick={hide}>
                  Close
                </Button>
              </Type>
            )
          }}
        </DrawerBox>

        <Button onClick={toggle}>
          Open
        </Button>
      </>
    )
  }}
</Drawer>
*/
const nodeType = 'div'
const defaultCSS = css`
  ${d.block};
  ${pos.fixed};
  ${maxZIndex};
  ${ov.autoY};
`
const SFC = createComponent({
  name: 'Drawer',
  CSS,
  themePath: 'drawer'
})
const {Consumer, Provider} = React.createContext(emptyObj)

export const DrawerConsumer = Consumer
export const DrawerBox = React.forwardRef(
  function DrawerBox (
    {children, portal = false, ...props},
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

export default function Drawer (props) {
  return (props.transition || Slide)({
    fromLeft: true,
    ...props,
    children: dropProps => <Provider value={dropProps} children={
      props.children(dropProps)
    }/>
  })
}
