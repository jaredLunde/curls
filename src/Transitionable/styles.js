import {css} from '@emotion/core'
import {nullIfFalse} from '../utils'


export const duration = nullIfFalse(
  (value, theme) => css`transition-duration: ${theme.duration[value] || value}ms;`
)
export const easing = nullIfFalse((value, theme) => {
  let easing = theme.easing[value] || value
  easing = typeof easing === 'string' ? easing : `cubic-bezier(${easing.join(',')})`

  return css`transition-timing-function: ${easing};`
})
export const delay = nullIfFalse(value => css`transition-delay: ${value}ms;`)
export const property = nullIfFalse(value =>
  css`transition-property: ${
    typeof value === 'string' ? value : value.join(',')
  };`
)
