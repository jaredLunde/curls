import {css} from '@emotion/core'
import {fastMemoize, nullIfFalse} from '../utils'


const themeScale = fastMemoize('buttonSize', s =>
  (t, p) => typeof t.scale[s] === 'function' ? t.scale[s](t, p) : t.scale[s]
)
// export const xxs = themeScale('xxs')
// export const xs = themeScale('xs')
// export const sm = themeScale('sm')
// export const md = themeScale('md')
// export const lg = themeScale('lg')
// export const xl = themeScale('xl')
// export const xxl = themeScale('xxl')
export const size = (s, t, p) => themeScale(s)(t, p)

export function __buttonStyles (v, t, p) {
  return css`
    ${t.getHoverClass(t, p)};
    ${t.getActiveClass(t, p)}
  `
}
