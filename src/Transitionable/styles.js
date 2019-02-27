import {css} from '@emotion/core'
import {memoTheme, memoValue} from '../utils'


export const duration = memoTheme(
  (value, theme) => css`transition-duration: ${theme.duration[value] || value}ms;`
)
export const easing = memoTheme((value, theme) => {
  let easing = theme.easing[value] || value
  easing = typeof easing === 'string' ? easing : `cubic-bezier(${easing.join(',')})`

  return css`transition-timing-function: ${easing};`
})
export const delay = memoValue(value => css`transition-delay: ${value}ms;`)
export const property = memoValue(value =>
  css`transition-property: ${
    typeof value === 'string' ? value : value.join(',')
  };`
)
