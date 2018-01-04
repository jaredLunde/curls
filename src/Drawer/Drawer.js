import {css, cx} from 'emotion'
import reduceProps from 'react-cake/es/utils/reduceProps'
import {maxZIndex} from '../global'
import {FlexBox} from '../Box'
import Slide from '../Slide'
import {getPosFromProps} from '../Slide/utils'
import {createSFC, mergeThemeDefaults} from '../utils'
import propTypes from './propTypes'
import * as CSS from './CSS'
import defaultTheme from './defaultTheme'


const themePath = 'drawer'
const DrawerSFC = createSFC({
  name: 'Drawer',
  propTypes,
  CSS,
  defaultTheme,
  themePath
})
const drawerCSS = css`
  display: block;
  position: fixed;
  background: $drawer-background;
  ${maxZIndex};
`


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
export default function Drawer ({children, pa, ...props}) {
  const position = getPosFromProps(props)
  delete props[position]

  return FlexBox({
    touchScrolling: true,
    ...props,
    children: function (slideProps) {
      const theme = mergeThemeDefaults({
        defaultTheme,
        themePath,
        props: slideProps,
        defaults: ['defaultDirection']
      })

      slideProps = {
        ...slideProps,
        children: function ({slideIn, slideOut, className, ...sfcProps}) {
          // renders the element
          const renderProps = {
            [theme.defaultDirection]: position === void 0,
            show: slideIn,
            hide: slideOut,
            className: cx(drawerCSS, className),
            pa,
            ...sfcProps,
            [position]: true,
            children
          }
          
          renderProps[position === void 0 ? theme.defaultDirection : position] = true
          return DrawerSFC(renderProps)
        }
      }

      slideProps[position === void 0 ? theme.defaultDirection : position] = true
      return Slide(slideProps)
    }
  })
}
