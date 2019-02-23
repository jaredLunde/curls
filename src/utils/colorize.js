import {css} from '@emotion/core'


export default (property, color, theme) =>
  color === false ? null : css`${property}: ${theme.colors[color] || color};`
