import {css} from '@emotion/core'
import {directionalScale, isDirectional, colorize, toSize, nullIfFalse} from '../utils'


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

export const ov = nullIfFalse(value => {
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
})

export const z = nullIfFalse(value => css`z-index: ${value};`)
// colorize already implements nullIfFalse
export const bg = (value, theme) => colorize('background', value, theme)
export const sh = nullIfFalse((value, theme) => theme.getBoxShadow(value, theme))
// colorize already implements nullIfFalse
export const bc = (value, theme) => colorize('border-color', value, theme)
// we don't use rem for border-width because it doesn't have business being relative to the
// size of the font or zoom of the screen
export const bw = nullIfFalse((value, theme) => {
  if (isDirectional(value)) {
    return css`
      border-style: solid;
      ${directionalScale(
        'border-{XYZ}-width', 
      theme.borderWidthScale, 
      value, 
      theme, 
      void 0, 
      'px'
    )};
    `
  } else {
    return css`
      border-style: solid;
      border-width: ${toSize(theme.borderWidthScale[value], 'px')};
    `
  }
})
export const w = nullIfFalse(value => css`width: ${toSize(value)};`)
export const h = nullIfFalse(value => css`height: ${toSize(value)};`)
export const t = nullIfFalse(value => css`top: ${toSize(value)};`)
export const r = nullIfFalse(value => css`right: ${toSize(value)};`)
export const b = nullIfFalse(value => css`bottom: ${toSize(value)};`)
export const l = nullIfFalse(value => css`left: ${toSize(value)};`)
export const minW = nullIfFalse(value => css`min-width: ${toSize(value)};`)
export const minH = nullIfFalse(value => css`min-height: ${toSize(value)};`)
export const maxW = nullIfFalse(value => css`max-width: ${toSize(value)};`)
export const maxH = nullIfFalse(value => css`max-height: ${toSize(value)};`)

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

export const br = nullIfFalse((value, theme) => {
  const {borderRadiusScale} = theme

  if (isDirectional(value)) {
    return css`
      ${directionalScale(
        'border-{XYZ}-radius',
        borderRadiusScale,
        value,
        theme,
        borderRadiusDirections,
        'rem'
      )};
    `
  } else {
    return css`border-radius: ${toSize(borderRadiusScale[value], 'rem')};`
  }
})

export const m = nullIfFalse((value, theme) => {
  const {spacingScale} = theme

  if (isDirectional(value)) {
    return directionalScale('margin-{XYZ}', spacingScale, value, theme, void 0, 'rem')
  } else {
    return css`margin: ${toSize(spacingScale[value], 'rem')};`
  }
})

export const p = nullIfFalse((value, theme) => {
  if (isDirectional(value)) {
    return directionalScale('padding-{XYZ}', theme.spacingScale, value, theme, void 0, 'rem')
  } else {
    return css`padding: ${toSize(theme.spacingScale[value], 'rem')};`
  }
})
