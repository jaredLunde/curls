import {css} from '@emotion/core'
import {fastMemoize} from '../utils'


const themeScale = fastMemoize('buttonSize', s =>
  (t, p) => typeof t.scale[s] === 'function' ? t.scale[s](t, p) : t.scale[s]
)

export const size = (s, t, p) => themeScale(s)(t, p)

export function __buttonStyles (v, t, p) {
  return css`
    ${t.getHoverClass(t, p)};
    ${t.getActiveClass(t, p)}
  `
}
