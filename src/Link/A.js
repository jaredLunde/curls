import {cx} from 'emotion'
import reduceProps from 'react-cake/es/utils/reduceProps'
import Type from '../Type'
import {getComponentTheme} from '../utils'
import * as defaultTheme from './defaultTheme'
import {linkColor} from './utils'
import GLOBAL from './global'
const __GLOBAL = GLOBAL  // prevent tree-shaking from elimating me


const themePath = 'link'


export default function A (props) {
  // merges the default colors and sizes to the theme
  const theme = getComponentTheme(defaultTheme, props.theme, themePath)
  // adds color class and removes colors from the props
  // renders the element
  return Type({
    nodeType: 'a',
    ...props,
    color: void 0,
    className: cx(linkColor(props.color, theme), props.className)
  })
}
