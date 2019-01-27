import {css} from '@emotion/core'
import {placeholder} from './utils'


export function __inputStyles (_, theme, props) {
  return css`
    ${placeholder(theme.getPlaceholderClass(props, theme))};
    ${theme.getHoverClass(props, theme)};
    ${theme.getFocusClass(props, theme)};
  `
}
