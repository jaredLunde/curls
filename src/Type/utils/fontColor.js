import {css} from 'emotion'
import {colorizeProps} from '../../utils'


export default function fontColor (props, theme) {
  return colorizeProps('color', props, theme, theme.defaultColor)
}
