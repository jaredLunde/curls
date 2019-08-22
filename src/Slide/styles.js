import {css} from '@emotion/core'
import memoize from 'trie-memoize'
import {baseIsNotVisible, baseIsVisible} from '../Fade/styles'
import {unit, nullIfFalsy, get} from '../utils'
import * as dT from './defaultTheme'

const transform = memoize(
  [Map, Map, Map],
  (x, y, z) =>
    css`
      transform: translate3d(${x}, ${y}, ${z});
    `
)
export const isVisible_ = css`
    ${baseIsVisible};
    transform: translate3d(0, 0, 0);
  `,
  isVisible = v => (v === true ? isVisible_ : baseIsNotVisible),
  whichVal = (v, ov, t, isVisible) =>
    isVisible === true
      ? 0
      : v === true
      ? `${ov}%`
      : unit(v, get(t.slide, 'distanceUnit', dT)),
  fromTop = nullIfFalsy((v, t, p) =>
    transform(
      0,
      `${whichVal(
        isNaN(v) || typeof v === 'boolean' ? v : Number(v) * -1,
        -100,
        t,
        p.isVisible
      )}`,
      0
    )
  ),
  fromRight = nullIfFalsy((v, t, p) =>
    transform(`${whichVal(v, 100, t, p.isVisible)}`, 0, 0)
  ),
  fromBottom = nullIfFalsy((v, t, p) =>
    transform(0, `${whichVal(v, 100, t, p.isVisible)}`, 0)
  ),
  fromLeft = nullIfFalsy((v, t, p) =>
    transform(
      `${whichVal(
        isNaN(v) || typeof v === 'boolean' ? v : Number(v) * -1,
        -100,
        t,
        p.isVisible
      )}`,
      0,
      0
    )
  )
