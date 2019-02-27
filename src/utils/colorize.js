import {css} from '@emotion/core'
import memoize from 'trie-memoize'


const colorize = memoize(
  [Map, Map, Map],
  (theme, property, color) => css`${property}: ${theme.colors[color] || color};`
)

export default (p, c, t) => c === false ? null : colorize(t, p, c)
/*
 import {css} from '@emotion/core'


 export default (property, color, t) =>
 color === false ? null : css`${property}: ${t.colors[color] || color};`

 */