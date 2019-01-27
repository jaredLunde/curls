import React from 'react'
import emptyObj from 'empty/object'
import {css, ClassNames} from '@emotion/core'
import {portalize} from '../utils'
import {maxZIndex} from '../browser'
import {FlexBox} from '../Box'
import Slide from '../Slide'
import {getPosFromProps} from '../Slide/utils'
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
    {children, portal, ...props},
    innerRef
  ) {
    return (
      <ClassNames>
        {({cx}) => (
          <Consumer children={
            function ({className, ...transitionProps}) {
              const boxChild =
                typeof children === 'function' ? children(transitionProps) : children

              let Component = SFC({
                ...props,
                className: cx(className, props.className),
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

              return portalize(Component, portal)
            }
          }/>
        )}
      </ClassNames>
    )
  }
)

export default function Drawer (props) {
  return (props.transition || Slide)({
    ...props,
    [getPosFromProps(props) || 'fromBottom']: true,
    children: dropProps => <Provider value={dropProps} children={props.children(dropProps)}/>
  })
}
