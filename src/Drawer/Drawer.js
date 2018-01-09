import {css, cx} from 'emotion'
import reduceProps from 'react-cake/es/utils/reduceProps'
import {maxZIndex} from '../global'
import {FlexBox} from '../Box'
import Slide from '../Slide'
import {getPosFromProps} from '../Slide/utils'
import {createFactory, getComponentTheme} from '../utils'
import {db, pf} from '../Box/CSS'
import propTypes from './propTypes'
import * as CSS from './CSS'
import defaultTheme from './defaultTheme'


const themePath = 'drawer'
const defaultCSS = css`
  ${db};
  ${pf};
  ${maxZIndex};
`
const DrawerSFC = createFactory({
  name: 'Drawer',
  propTypes,
  CSS,
  defaultCSS,
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
        children: function (sfcProps) {
          // renders the element
          const renderProps = {pa, ...sfcProps, children}
          renderProps[position === void 0 ? theme.defaultDirection : position] = true
          return DrawerSFC(renderProps)
        }
      }

      slideProps[position === void 0 ? theme.defaultDirection : position] = true
      return Slide(slideProps)
    }
  })
}
