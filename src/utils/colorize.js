import {css} from 'emotion'


export default function colorize (property, color, theme) {
  return css`${property}: ${theme.colors[color] || color};`
}
