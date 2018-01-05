import {css, cx} from 'emotion'
import reduceProps from 'react-cake/es/utils/reduceProps'
import {maxZIndex} from '../global'
import {FlexBox} from '../Box'
import Slide from '../Slide'
import {getPosFromProps} from '../Slide/utils'
import {createSFC, getComponentTheme} from '../utils'
import {db, pf} from '../Box/CSS'
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
  ${db};
  ${pf};
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
      const theme = getComponentTheme(defaultTheme, slideProps.theme, themePath)

      slideProps = {
        ...slideProps,
        children: function ({className, ...sfcProps}) {
          // renders the element
          const renderProps = {
            className: cx(drawerCSS, className),
            pa,
            ...sfcProps,
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
