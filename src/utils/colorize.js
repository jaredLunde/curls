import {css} from '@emotion/core'
import memoize from 'trie-memoize'


const colorize = memoize(
  [WeakMap, Map, Map],
  (theme, property, color) => css`${property}: ${theme.colors[color] || color};`
)

export default (p, c, t) => c === false || c === null ? null : colorize(t, p, c)