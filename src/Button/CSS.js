import {css} from 'emotion'


export function xxs (v, t) {
  return t.sizes['xxs']
}


export function xs (v, t) {
  return t.sizes['xs']
}


export function sm (v, t) {
  return t.sizes['sm']
}


export function md (v, t) {
  return t.sizes['md']
}


export function lg (v, t) {
  return t.sizes['lg']
}


export function xl (v, t) {
  return t.sizes['xl']
}


export function xxl (v, t) {
  return t.sizes['xxl']
}


export function bg (v, t, props) {
  return css`
    ${t.getHoverClass(props, t)};
    ${t.getActiveClass(props, t)}
  `
}
