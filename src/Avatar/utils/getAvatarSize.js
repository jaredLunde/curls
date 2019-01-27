import {css} from '@emotion/core'
import {toSize} from '../../utils'


export default function (size, val, theme) {
  if (val === false) return null;
  return css`
    width: ${toSize(theme.scale[size])};
    height: ${toSize(theme.scale[size])};
  `
}
