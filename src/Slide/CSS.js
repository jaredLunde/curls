import {css} from 'emotion'
import {baseIsNotVisible, baseIsVisible} from '../Fade/CSS'


export const isVisible_ = css`${baseIsVisible}; transform: translate3d(0, 0, 0);`

export function isVisible (value, theme) {
  return value === true ? isVisible_ : baseIsNotVisible
}


function whichVal (v, ov, props) {
  return typeof v === 'number' ? v : props.isVisible ? 0 : ov
}

function transform (...args) {
  return css`transform: translate3d(${args.join(',')});`
}

export function fromTop(v, _, props) {
  if (v === false) return;
  return transform(0, `${whichVal(v, -100, props)}%`, 0)
}

export function fromRight(v, _, props) {
  if (v === false) return;
  return transform(`${whichVal(v, 100, props)}%`, 0, 0)
}

export function fromBottom(v, _, props) {
  if (v === false) return;
  return transform(0, `${whichVal(v, 100, props)}%`, 0)
}

export function fromLeft(v, _, props) {
  if (v === false) return;
  return transform(`${whichVal(v, -100, props)}%`, 0, 0)
}
