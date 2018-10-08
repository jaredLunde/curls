import React from 'react'
import {css, cx} from 'emotion'
import {maxZIndex} from '../global'
import {FlexBox} from '../Box'
import Slide from '../Slide'
import createComponent, {renderNode} from '../createComponent'
import {d, pos, ov, h} from '../Box/CSS'
import * as CSS from './CSS'
import * as defaultTheme from './defaultTheme'


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
  defaultTheme,
  themePath: 'drawer'
})


/**
Drawer({
  fromLeft: true,
  children: function ({className, show, hide, toggle, isVisible, ...props}) {
    <>
      <div className={className}>
      {/** this is the drawer *\/}
      </div>
      <button onClick={toggle}>

      </button>
    </>
  }
})
*/
export default React.forwardRef(
  function Drawer (props, innerRef) {
    props = Object.assign({innerRef}, props)
    const transition = props.transition || Slide
    const childComponent = props.children

    props.children = function (transitionProps) {
      transitionProps.children = function ({...drawerProps}) {
        const classNameFromDrawer = drawerProps.className
        // Box component passed to the child function
        drawerProps.DrawerBox = function DrawerBox (boxProps) {
          return FlexBox({
            ...boxProps,
            children: function (drawerBoxProps) {
              drawerBoxProps.nodeType = drawerBoxProps.nodeType || nodeType
              drawerBoxProps.className = cx(
                transitionProps.className,
                classNameFromDrawer,
                boxProps.className,
                drawerBoxProps.className
              )

              drawerBoxProps.children = boxProps.children({
                isVisible: drawerProps.isVisible,
                show: drawerProps.show,
                hide: drawerProps.hide,
                toggle: drawerProps.toggle
              })

              return renderNode(drawerBoxProps, defaultCSS)
            }
          })
        }
        delete drawerProps.className

        return childComponent(drawerProps)
      }

      return transition(transitionProps)
    }

    return SFC(props)
  }
)
