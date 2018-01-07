import {cx} from 'emotion'
import reduceProps from 'react-cake/es/utils/reduceProps'
import {FlexBox} from '../Box'
import Type from '../Type'
import {getComponentTheme} from '../utils'
import defaultTheme from './defaultTheme'
import {linkColor} from './utils'


const themePath = 'link'


export default function A ({children, nodeType = 'a', color = null, className, ...props}) {
  // merges the default colors and sizes to the theme
  const theme = getComponentTheme(defaultTheme, props.theme, themePath)
  console.log('Link theme:', theme)
  // adds color class and removes colors from the props
  className = cx(linkColor(color, theme), className)
  props[theme.defaultWeight] = true
  // renders the element
  return Type({children, nodeType, className, ...props})
}
