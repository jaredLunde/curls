import {css} from '@emotion/core'
import memoize from 'trie-memoize'
import {baseIsNotVisible, baseIsVisible} from '../Fade/styles'
import {toSize, nullIfFalsey} from '../utils'


const transform = memoize(
  [Map, Map, Map],
  (x, y, z) => css`transform: translate3d(${x}, ${y}, ${z});`
)
export const
  isVisible_ = css`${baseIsVisible}; transform: translate3d(0, 0, 0);`,
  isVisible = v => v === true ? isVisible_ : baseIsNotVisible,
  whichVal = (v, ov, t, isVisible) =>
    isVisible === true ? 0 : v === true ? `${ov}%` : toSize(v, t.distanceUnit),
  fromTop = nullIfFalsey((v, t, p) => transform(0, `${whichVal(v, -100, t, p.isVisible)}`, 0)),
  fromRight = nullIfFalsey((v, t, p) => transform(`${whichVal(v, 100, t, p.isVisible)}`, 0, 0)),
  fromBottom = nullIfFalsey((v, t, p) => transform(0, `${whichVal(v, 100, t, p.isVisible)}`, 0)),
  fromLeft = nullIfFalsey((v, t, p) => transform(`${whichVal(v, -100, t, p.isVisible)}`, 0, 0))