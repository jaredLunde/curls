import {css} from '@emotion/core'


export function __linkStyles (_, theme, props) {
  return css`
    ${theme.getHoverClass(props, theme)};
    ${theme.getActiveClass(props, theme)};
  `
}
