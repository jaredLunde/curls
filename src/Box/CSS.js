import {css} from 'emotion'
import {directionalScale, isDirectional, colorize, toSize} from '../utils'


export const pos = {
  relative: css`position: relative;`,
  absolute: css`position: absolute;`,
  fixed: css`position: fixed;`,
  sticky: css`
    position: relative;
    position: sticky;
    top: 0;
  `,
  static: css`position: static;`
}

export const d = {
  block: css`display: block;`,
  inlineBlock: css`display: inline-block;`,
  inline: css`display: inline;`,
  none: css`display: none;`
}

export const overflow = {
  auto: css`overflow: auto;`,
  autoX: css`overflow-x: auto;`,
  autoY: css`overflow-y: auto;`,
  hidden: css`overflow: hidden;`,
  hiddenX: css`overflow-x: hidden;`,
  hiddenY: css`overflow-y: hidden;`,
  scroll: css`overflow: scroll;`,
  scrollX: css`overflow-x: scroll;`,
  scrollY: css`overflow-y: scroll;`,
}
export function ov (value) {
  const vals = value.split(' ')

  if (vals.length === 1) {
    return overflow[value]
  }

  let css
  for (let x = 0; x < vals.length; x++) {
    const val = vals[x]
    if (css) {
      css = css`${css} ${overflow[val]};`
    } else {
      css = css`${overflow[val]};`
    }
  }

  return css
}

export function z (value) {
  return css`z-index: ${value};`
}

export const touchScrolling = css`-webkit-overflow-scrolling: touch;`

export function bg (value, theme) {
  return colorize('background', value, theme)
}


export function sh (value, theme) {
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
      border-width: ${toSize(borderWidthScale[value])};
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
    return css`border-radius: ${toSize(borderRadiusScale[value])};`
  }
}


export function m (value, theme) {
  const {spacingScale} = theme

  if (isDirectional(value)) {
    return directionalScale('margin-{XYZ}', spacingScale, value, theme)
  } else {
    return css`margin: ${toSize(spacingScale[value])};`
  }
}


export function p (value, theme) {
  const {spacingScale} = theme
  if (isDirectional(value)) {
    return directionalScale('padding-{XYZ}', spacingScale, value, theme)
  } else {
    return css`padding: ${toSize(spacingScale[value])};`
  }
}
