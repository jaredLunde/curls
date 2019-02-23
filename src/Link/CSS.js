import {css} from '@emotion/core'


export function __linkStyles (_, theme, props) {
  return css`
    ${theme.getHoverClass(theme, props)};
    ${theme.getActiveClass(theme, props)};
  `
}
