import {cx} from 'emotion'
import Type from '../Type'
import {getComponentTheme} from '../utils'
import {placeholder} from '../Input/utils'
import defaultTheme from './defaultTheme'


const themePath = 'textArea'


export default function TextArea (props) {
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
    ...props,
    nodeType: 'textarea',
    className: cx(placeholder(props.color || null, theme), props.className)
  })
}
