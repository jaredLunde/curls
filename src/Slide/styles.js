import {css} from '@emotion/core'
import {baseIsNotVisible, baseIsVisible} from '../Fade/styles'
import {toSize, nullIfFalse} from '../utils'


export const isVisible_ = css`${baseIsVisible}; transform: translate3d(0, 0, 0);`
export const isVisible = v => v === true ? isVisible_ : baseIsNotVisible
const whichVal = (v, ov, t, p) =>
  p.isVisible === true ? 0 : v === true ? `${ov}%` : toSize(v, t.distanceUnit)
const transform = (...args) => css`transform: translate3d(${args.join(',')});`
export const fromTop = nullIfFalse(
  (v, t, p) => transform(0, `${whichVal(v, -100, t, p)}`, 0)
)
export const fromRight = nullIfFalse(
  (v, t, p) => transform(`${whichVal(v, 100, t, p)}`, 0, 0)
)
export const fromBottom = nullIfFalse(
  (v, t, p) => transform(0, `${whichVal(v, 100, t, p)}`, 0)
)
export const fromLeft = nullIfFalse(
  (v, t, p) => transform(`${whichVal(v, -100, t, p)}`, 0, 0)
)