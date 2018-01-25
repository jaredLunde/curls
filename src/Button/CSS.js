import {css} from 'emotion'


export function xxs (v, t) {
  return t.scale['xxs']
}


export function xs (v, t) {
  return t.scale['xs']
}


export function sm (v, t) {
  return t.scale['sm']
}


export function md (v, t) {
  return t.scale['md']
}


export function lg (v, t) {
  return t.scale['lg']
}


export function xl (v, t) {
  return t.scale['xl']
}


export function xxl (v, t) {
  return t.scale['xxl']
}


export function __buttonStyles (v, t, props) {
  return css`
    ${t.getHoverClass(props, t)};
    ${t.getActiveClass(props, t)}
  `
}
