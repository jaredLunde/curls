import {css, cx} from 'emotion'
import reduceProps from 'react-cake/es/utils/reduceProps'
import createOptimized from 'react-cake/es/utils/createOptimized'
import {maxZIndex} from '../global'
import Box from '../Box'
import Slide from '../Slide'
import {getPosFromProps} from '../Slide/utils'
import {createComponent, getComponentTheme} from '../utils'
import {d, pos} from '../Box/CSS'
import propTypes from './propTypes'
import * as CSS from './CSS'
import * as defaultTheme from './defaultTheme'


const themePath = 'drawer'
const defaultCSS = css`
  ${d.block};
  ${pos.fixed};
  ${maxZIndex};
`
const SFC = createComponent({
  name: 'Drawer',
  propTypes,
  CSS,
  defaultTheme,
  themePath
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
export default function Drawer (props) {
  const transitionType = props.transitionType || Slide
  const position = getPosFromProps(props)
  const childComponent = props.children
  delete props[position]

  const theme = getComponentTheme(defaultTheme, props.theme, themePath)
  props.children = function (sfcProps) {
    // renders the element
    const renderProps = {
      pos: props.pos,
      ...sfcProps,
      children: function (drawerProps) {
        const classNameFromDrawer = drawerProps.className
        // Box component passed to the child function
        drawerProps.DrawerBox = function DrawerBox (boxProps) {
          return Box({
            h: '100%',
            ...boxProps,
            children: function (drawerBoxProps) {
              const nodeType = drawerBoxProps.nodeType || 'div'
              drawerBoxProps.className = cx(
                defaultCSS,
                sfcProps.className,
                classNameFromDrawer,
                boxProps.className,
                drawerBoxProps.className
              )
              delete drawerBoxProps.nodeType
              return createOptimized(
                nodeType,
                drawerBoxProps,
                boxProps.children({
                  isVisible: sfcProps.isVisble,
                  show: sfcProps.show,
                  hide: sfcProps.hide,
                  toggle: sfcProps.toggle
                })
              )
            }
          })
        }
        delete drawerProps.className

        return createOptimized(childComponent, drawerProps)
      }
    }
    renderProps[position === void 0 ? theme.defaultDirection : position] = true
    delete renderProps.className

    return SFC(renderProps)
  }

  props[position === void 0 ? theme.defaultDirection : position] = true
  return transitionType(props)
}
