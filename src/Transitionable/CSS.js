import {css} from '@emotion/core'


export function duration (value, theme) {
  return css`transition-duration: ${theme.duration[value] || value}ms;`
}

export function easing (value, theme) {
  let easing = theme.easing[value] || value
  easing = typeof easing === 'string' ? easing : `cubic-bezier(${easing.join(',')})`

  return css`transition-timing-function: ${easing};`
}

export function delay (value, theme) {
  return css`transition-delay: ${value}ms;`
}


export function property (value, theme) {
  return css`transition-property: ${
    typeof value === 'string' ? value : value.join(',')
  };`
}
