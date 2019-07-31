import {css} from '@emotion/core'
import {memoTheme, memoValue, unit, get} from '../utils'
import * as dT from './defaultTheme'


export const
  duration = memoTheme(
    (value, theme) => css`transition-duration: ${get(theme.transitionable, 'duration', dT)[value] || value}ms;`
  ),
  easing = memoTheme((value, theme) => {
    let easing = get(theme.transitionable, 'easing', dT)[value] || value
    easing = typeof easing === 'string' ? easing : `cubic-bezier(${easing.join(',')})`
    return css`transition-timing-function: ${easing};`
  }),
  delay = memoValue(v => css`transition-delay: ${unit(v, 'ms')};`),
  property = memoValue(v => css`transition-property: ${typeof v === 'string' ? v : v.join(',')};`)
