import {css} from 'emotion'
import {toSize} from '../../utils'


export default function (size, theme) {
  return css`
    width: ${toSize(theme.scale[size])};
    height: ${toSize(theme.scale[size])};
  `
}
