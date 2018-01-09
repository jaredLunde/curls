import {cx} from 'emotion'
import Type from '../Type'
import {getComponentTheme} from '../utils'
import {placeholder} from './utils'
import * as defaultTheme from './defaultTheme'
import GLOBAL from './global'
const __GLOBAL = GLOBAL  // prevent tree-shaking from elimating me


const themePath = 'input'


export default function Input (props) {
  const theme = getComponentTheme(defaultTheme, props.theme, themePath)

  return Type({
    bg: theme.defaultBg,
    bc: theme.defaultBorderColor,
    bw: theme.defaultBorderWidth,
    br: theme.defaultBorderRadius,
    bs: theme.defaultBoxShadow,
    p: theme.defaultPadding,
    color: theme.defaultTypeColor,
    face: theme.defaultTypeFace,
    [theme.defaultTypeSize]: true,
    [theme.defaultTypeWeight]: true,
    type: 'text',
    ...props,
    nodeType: 'input',
    className: cx(placeholder(props.color || null, theme), props.className)
  })
}
