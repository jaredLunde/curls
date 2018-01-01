import {colorizeProps} from '../../utils'


export default function dividerColor (props, theme) {
  return colorizeProps(
    'background-color',
    props,
    theme,
    theme.defaultColor
  )
}
