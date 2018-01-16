import {css} from 'emotion'


export function __linkStyles (_, theme, props) {
  return css`
    ${theme.getHoverClass(props, theme)};
    ${theme.getActiveClass(props, theme)};
  `
}
