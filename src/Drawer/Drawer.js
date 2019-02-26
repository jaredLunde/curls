import React from 'react'
import emptyObj from 'empty/object'
import {css} from '@emotion/core'
import {portalize} from '../utils'
import {MAX_Z_INDEX} from '../browser'
import {FlexBox} from '../Box'
import Slide from '../Slide'
import slidePropTypes from '../Slide/propTypes'
import createComponent, {renderNode} from '../createComponent'
import {d, pos, ov} from '../Box/styles'
import * as styles from './styles'


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
const as = 'div'
const defaultCSS = css`
  ${d.block};
  ${pos.fixed};
  ${ov.autoY};
  z-index: ${MAX_Z_INDEX};
`
const SFC = createComponent({name: 'drawer', styles})
const {Consumer, Provider} = React.createContext(emptyObj)

export const DrawerConsumer = Consumer
export const DrawerBox = React.forwardRef(
  function DrawerBox ({children, portal, ...props}, innerRef) {
    return (
      <Consumer children={
        function ({css, ...transitionProps}) {
          const boxChild =
            typeof children === 'function' ? children(transitionProps) : children

          let Component = SFC({
            ...props,
            css: [css, props.css],
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

          return portalize(Component, portal)
        }
      }/>
    )
  }
)

const Drawer = props => {
  return (props.transition || Slide)({
    ...props,
    children: dropProps => <Provider value={dropProps} children={props.children(dropProps)}/>
  })
}

Drawer.propTypes /* remove-proptypes */ = slidePropTypes

export default Drawer
