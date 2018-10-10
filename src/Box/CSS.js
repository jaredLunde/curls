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
  touch: css`-webkit-overflow-scrolling: touch;`
}
export function ov (value) {
  if (value === false) return null;
  const vals = value.split(' ')

  if (vals.length === 1) {
    return overflow[value]
  }

  let CSS
  for (let x = 0; x < vals.length; x++) {
    const val = vals[x]
    if (CSS) {
      CSS = css`${CSS} ${overflow[val]};`
    } else {
      CSS = css`${overflow[val]};`
    }
  }

  return CSS
}

export function z (value) {
  if (value === false) return null;
  return css`z-index: ${value};`
}


export function bg (value, theme) {
  if (value === false) return null;
  return colorize('background', value, theme)
}


export function sh (value, theme) {
  if (value === false) return null;

  return theme.getBoxShadow(value, theme)
}


export function bc (value, theme) {
  if (value === false) return null;
  return colorize('border-color', value, theme)
}


export function bw (value, theme) {
  if (value === false) return null;
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
  if (value === false) return null;
  return css`width: ${toSize(value)};`;
}

export function h (value) {
  if (value === false) return null;
  return css`height: ${toSize(value)};`;
}

export function t (value) {
  if (value === false) return null;
  return css`top: ${toSize(value)};`;
}

export function r (value) {
  if (value === false) return null;
  return css`right: ${toSize(value)};`;
}

export function b (value) {
  if (value === false) return null;
  return css`bottom: ${toSize(value)};`;
}

export function l (value) {
  if (value === false) return null;
  return css`left: ${toSize(value)};`;
}

export function minW (value) {
  return css`min-width: ${toSize(value)};`;
}

export function minH (value) {
  return css`min-height: ${toSize(value)};`;
}

export function maxW (value) {
  return css`max-width: ${toSize(value)};`;
}

export function maxH (value) {
  return css`max-height: ${toSize(value)};`;
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
  if (value === false) return null;
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
  if (value === false) return null;
  const {spacingScale} = theme

  if (isDirectional(value)) {
    return directionalScale('margin-{XYZ}', spacingScale, value, theme)
  } else {
    return css`margin: ${toSize(spacingScale[value])};`
  }
}


export function p (value, theme) {
  if (value === false) return null;
  const {spacingScale} = theme

  if (isDirectional(value)) {
    return directionalScale('padding-{XYZ}', spacingScale, value, theme)
  } else {
    return css`padding: ${toSize(spacingScale[value])};`
  }
}
