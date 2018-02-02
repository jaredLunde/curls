import {css} from 'emotion'
import {placeholder} from './utils'


export function __inputStyles (_, theme, props) {
  console.log(placeholder(theme.getPlaceholderClass(props, theme)))
  return css`
    ${placeholder(theme.getPlaceholderClass(props, theme))};
    ${theme.getHoverClass(props, theme)};
    ${theme.getFocusClass(props, theme)};
  `
}
