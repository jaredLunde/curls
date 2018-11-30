import {css} from 'emotion'


export function duration (value, theme) {
  return css`transition-duration: ${theme.duration[value] || value}ms;`
}

export function speed (...args) {
  if (__DEV__) {
    console.warn(`The speed='' prop  has been replaced with duration=''.`)
  }

  return duration(...args)
}

function createDurationFunc (name) {
  return function (_, theme) {
    if (__DEV__) {
      console.warn(
        `Duration shortcut props (veryFast, fast, med...) are deprecated. ` +
        `Use duration='${name}' instead.`
      )
    }

    return duration(name, theme)
  }
}

export const veryFast = createDurationFunc('veryFast')
export const fast = createDurationFunc('fast')
export const med = createDurationFunc('med')
export const slow = createDurationFunc('slow')
export const verySlow = createDurationFunc('verySlow')


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
