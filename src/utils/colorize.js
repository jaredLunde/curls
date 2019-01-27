import {css} from '@emotion/core'


export default function colorize (property, color, theme) {
  return css`${property}: ${theme.colors[color] || color};`
}
