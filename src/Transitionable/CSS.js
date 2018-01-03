import {css} from 'emotion'


export function speed (value, theme) {
  return css`transition-duration: ${theme.speed[value]}ms;`
}


function createSpeedFunc (name) {
  return function (_, theme) {
    return speed(name, theme)
  }
}

export const veryFast = createSpeedFunc('veryFast')
export const fast = createSpeedFunc('fast')
export const med = createSpeedFunc('med')
export const slow = createSpeedFunc('slow')
export const verySlow = createSpeedFunc('verySlow')


export function easing (value, theme) {
  let easing = theme.easing[value]
  easing = typeof easing === 'string' ? easing : `cubic-bezier(${easing.join(',')})`

  return css`transition-timing-function: ${easing};`
}


function createTimingFunc (name) {
  return function (_, theme) {
    return easing(name, theme)
  }
}

export const boomerang = createTimingFunc('boomerang')
export const bounce = createTimingFunc('bounce')
export const easeOut = createTimingFunc('easeOut')
export const easeIn = createTimingFunc('easeIn')
export const easeInOut = createTimingFunc('easeInOut')
export const swiftMove = createTimingFunc('swiftMove')
export const swifterMove = createTimingFunc('swifterMove')
export const heavyMove = createTimingFunc('heavyMove')
export const swiftIn = createTimingFunc('swiftIn')
export const swiftOut = createTimingFunc('swiftOut')
export const linear = createTimingFunc('linear')


export function delay (value, theme) {
  return css`transition-delay: ${value}ms;`
}


export function property (value, theme) {
  return css`transition-property: ${
    typeof value === 'string' ? value : value.join(',')
  };`
}
