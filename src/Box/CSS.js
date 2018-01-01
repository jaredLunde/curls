import {css} from 'react-emotion'
import {directionalRemScale, isDirectional, colorize} from '../utils'

export const pr = css`position: relative;`
export const pa = css`position: absolute;`
export const pf = css`position: fixed;`
export const db = css`display: block;`
export const dib = css`display: inline-block;`
export const di = css`display: inline;`
export const fw = css`min-width: 100%;`
export const fh = css`min-height: 100%;`
export const cb = css`clear: both;`


export function bg (value, theme) {
  return colorize('background-color', value, theme)
}


export function bc (value, theme) {
  return colorize('border-color', value, theme)
}


export function bw (value, theme) {
  const {borderWidthScale} = theme

  if (isDirectional(value)) {
    return css`
      border-style: solid;
      ${directionalRemScale('border-{XYZ}-width', borderWidthScale, value)};
    `
  } else {
    return css`
      border-style: solid;
      border-width: ${borderWidthScale[value]}rem;
    `
  }
}


const borderRadiusDirections = {
  t: ['top-right', 'top-left'],
  r: ['top-right', 'bottom-right'],
  b: ['bottom-right', 'bottom-left'],
  l: ['top-left', 'bottom-left'],
  tl: ['top-left'],
  tr: ['top-right'],
  br: ['bottom-right'],
  bl: ['bottom-left']
}


export function br (value, theme) {
  const {borderRadiusScale} = theme

  if (isDirectional(value)) {
    return css`
      ${directionalRemScale(
        'border-{XYZ}-radius',
        borderRadiusScale,
        value,
        borderRadiusDirections
      )};
    `
  } else {
    return css`border-radius: ${borderRadiusScale[value]}rem;`
  }
}


export function m (value, theme) {
  const {spacingScale} = theme

  if (isDirectional(value)) {
    return directionalRemScale('margin-{XYZ}', spacingScale, value)
  } else {
    return css`padding: ${spacingScale[value]}rem;`
  }
}


export function p (value, theme) {
  const {spacingScale} = theme
  if (isDirectional(value)) {
    return directionalRemScale('padding-{XYZ}', spacingScale, value)
  } else {
    return css`padding: ${spacingScale[value]}rem;`
  }
}
