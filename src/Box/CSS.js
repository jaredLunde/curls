import {css} from 'emotion'
import {directionalScale, isDirectional, colorize, toSize} from '../utils'


export const pr = css`position: relative;`
export const pa = css`position: absolute;`
export const pf = css`position: fixed;`
export const sticky = css`
  position: relative;
  position: sticky;
  top: 0;
`
export const db = css`display: block;`
export const dib = css`display: inline-block;`
export const di = css`display: inline;`
export const dn = css`display: none;`
export const fw = css`width: 100%;`
export const fh = css`height: 100%;`
export const cb = css`clear: both;`
export const touchScrolling = css`-webkit-overflow-scrolling: touch;`

export function bg (value, theme) {
  return colorize('background', value, theme)
}


export function bs (value, theme) {
  return theme.getBoxShadow(value, theme)
}


export function bc (value, theme) {
  return colorize('border-color', value, theme)
}


export function bw (value, theme) {
  const {borderWidthScale} = theme

  if (isDirectional(value)) {
    return css`
      border-style: solid;
      ${directionalScale('border-{XYZ}-width', borderWidthScale, value, theme)};
    `
  } else {
    return css`
      border-style: solid;
      border-width: ${borderWidthScale[value]}rem;
    `
  }
}

export function w (value) {
  return css`width: ${toSize(value)};`;
}

export function h (value) {
  return css`height: ${toSize(value)};`;
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
      ${directionalScale(
        'border-{XYZ}-radius',
        borderRadiusScale,
        value,
        theme,
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
    return directionalScale('margin-{XYZ}', spacingScale, value, theme)
  } else {
    return css`margin: ${spacingScale[value]}rem;`
  }
}


export function p (value, theme) {
  const {spacingScale} = theme
  if (isDirectional(value)) {
    return directionalScale('padding-{XYZ}', spacingScale, value, theme)
  } else {
    return css`padding: ${spacingScale[value]}rem;`
  }
}
