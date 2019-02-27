import {css} from '@emotion/core'
import {fastMemoize, memoTheme} from '../utils'


const getPlainScale = memoTheme((s, t) => t.scale[s])
const themeScale = fastMemoize('buttonSize', s =>
  (t, p) => typeof t.scale[s] === 'function' ? t.scale[s](t, p) : getPlainScale(s, t)
)

export const size = (s, t, p) => themeScale(s)(t, p)
export function __buttonStyles (v, t, p) {
  return [
    t.getHoverClass(t, p),
    t.getActiveClass(t, p)
  ]
}
