import {cx} from 'emotion'
import reduceProps from 'react-cake/es/utils/reduceProps'
import {FlexBox} from '../Box'
import Type from '../Type'
import {mergeThemeDefaults} from '../utils'
import defaultTheme from './defaultTheme'
import {linkColor} from './utils'


const themePath = 'link'


export default function A ({children, nodeType = 'a', className, ...props}) {
  // merges the default colors and sizes to the theme
  const theme = mergeThemeDefaults({defaultTheme, themePath, props})
  // adds color class and removes colors from the props
  className = cx(linkColor(props, theme), className)
  props = reduceProps(props, theme.colors)
  // props[theme.defaultSize] = true
  props[theme.defaultWeight] = true
  // renders the element
  return Type({children, nodeType, className, ...props})
}
