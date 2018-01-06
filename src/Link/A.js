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
  const theme = mergeThemeDefaults({
    defaultTheme,
    themePath,
    props,
    defaults: ['defaultColor', 'defaultSize']
  })
  // adds color class and removes colors from the props
  className = cx(linkColor(props, theme), className)
  props = reduceProps(props, theme.colors)
  // renders the element
  return return Type(
    props.hasOwnProperty(theme.defaultSize)
    ? {children, nodeType, className ...props}
    : {[theme.defaultSize]: true, children, nodeType, className, ...props}
  )
}
