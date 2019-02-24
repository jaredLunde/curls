import {css} from '@emotion/core'
import {placeholder} from './utils'


export function __inputStyles (_, theme, props) {
  return css`
    ${placeholder(theme.getPlaceholderClass(theme, props))};
    ${theme.getHoverClass(theme, props)};
    ${theme.getFocusClass(theme, props)};
  `
}
