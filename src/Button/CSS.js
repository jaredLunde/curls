import {css} from 'emotion'
import {buttonSize, buttonColor} from './utils'
import {br as boxBr, bc as boxBc, bw as boxBw, bs as boxBs} from '../Box/CSS'


export function xxs (v, t) {
  return buttonSize('xxs', t)
}


export function xs (v, t) {
  return buttonSize('xs', t)
}


export function sm (v, t) {
  return buttonSize('sm', t)
}


export function md (v, t) {
  return buttonSize('md', t)
}


export function lg (v, t) {
  return buttonSize('lg', t)
}


export function xl (v, t) {
  return buttonSize('xl', t)
}


export function xxl (v, t) {
  return buttonSize('xxl', t)
}


export function br (value, theme) {
  return boxBr(value === null ? theme.defaultBorderRadius : value, theme)
}

export function bw (value, theme) {
  return boxBw(value === null ? theme.defaultBorderWidth : value, theme)
}

export function bc (value, theme) {
  return boxBc(value === null ? theme.defaultBorderColor : value, theme)
}

export function bs (value, theme) {
  return boxBs(value === null ? theme.defaultBoxShadow : value, theme)
}

export function bg (value, theme) {
  return buttonColor(value === null ? theme.defaultBg : value, theme)
}
