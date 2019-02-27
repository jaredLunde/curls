import {css} from '@emotion/core'
import memoize from 'trie-memoize'
import {baseIsNotVisible, baseIsVisible} from '../Fade/styles'
import {toSize, nullIfFalsey} from '../utils'


export const isVisible_ = css`${baseIsVisible}; transform: translate3d(0, 0, 0);`
export const isVisible = v => v === true ? isVisible_ : baseIsNotVisible
const whichVal = (v, ov, t, isVisible) =>
  isVisible === true ? 0 : v === true ? `${ov}%` : toSize(v, t.distanceUnit)
const transform = memoize(
  [{}, {}, {}],
  (x, y, z) => css`transform: translate3d(${x}, ${y}, ${z});`
)
export const fromTop = nullIfFalsey(
  (v, t, p) => transform(0, `${whichVal(v, -100, t, p.isVisible)}`, 0)
)
export const fromRight = nullIfFalsey(
  (v, t, p) => transform(`${whichVal(v, 100, t, p.isVisible)}`, 0, 0)
)
export const fromBottom = nullIfFalsey(
  (v, t, p) => transform(0, `${whichVal(v, 100, t, p.isVisible)}`, 0)
)
export const fromLeft = nullIfFalsey(
  (v, t, p) => transform(`${whichVal(v, -100, t, p.isVisible)}`, 0, 0)
)