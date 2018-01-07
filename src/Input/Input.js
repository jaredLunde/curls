import {cx} from 'emotion'
import Type from '../Type'
import {getTheme, mergeThemeProp} from '../utils'
import {placeholder} from './utils'
import defaultTheme from './defaultTheme'


const themePath = 'input'


export default function Input (props) {
  const theme = mergeThemeProp(defaultTheme, props, themePath)

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
