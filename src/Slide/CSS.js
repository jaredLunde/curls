import {css} from '@emotion/core'
import {baseIsNotVisible, baseIsVisible} from '../Fade/CSS'
import {toSize, nullIfFalse} from '../utils'


export const isVisible_ = css`${baseIsVisible}; transform: translate3d(0, 0, 0);`
export const isVisible = v => v === true ? isVisible_ : baseIsNotVisible
const whichVal = (v, ov, props) => props.isVisible === true ? 0 : v === true ? `${ov}%` : toSize(v)
const transform = (...args) => css`transform: translate3d(${args.join(',')});`
export const fromTop = nullIfFalse((v, _, props) => transform(0, `${whichVal(v, -100, props)}`, 0))
export const fromRight = nullIfFalse((v, _, props) => transform(`${whichVal(v, 100, props)}`, 0, 0))
export const fromBottom = nullIfFalse((v, _, props) => transform(0, `${whichVal(v, 100, props)}`, 0))
export const fromLeft = nullIfFalse((v, _, props) => transform(`${whichVal(v, -100, props)}`, 0, 0))