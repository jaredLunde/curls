import {css} from '@emotion/core'
import {directionalScale, isDirectional, colorize, toSize, memoValue, memoTheme} from '../utils'

const ws = /\s+/
export const ov = memoValue(value => {
  const vals = value.split(ws)
  if (vals.length === 1) return overflow[value]

  let CSS = [], i = 0
  for (; i < vals.length; i++)
    CSS.push(css`${overflow[vals[i]]};`)

  return CSS
})

export const
  z = memoValue(value => css`z-index: ${value};`),
  sh = memoTheme((value, theme) => theme.getBoxShadow(value, theme)),
  bg = (value, theme) => colorize('background', value, theme),
  bc = (value, theme) => colorize('border-color', value, theme),
  w = memoTheme((v, t) => css`width: ${toSize(v, t.sizeUnit)};`),
  h = memoTheme((v, t) => css`height: ${toSize(v, t.sizeUnit)};`),
  minW = memoTheme((v, t) => css`min-width: ${toSize(v, t.sizeUnit)};`),
  minH = memoTheme((v, t) => css`min-height: ${toSize(v, t.sizeUnit)};`),
  maxW = memoTheme((v, t) => css`max-width: ${toSize(v, t.sizeUnit)};`),
  maxH = memoTheme((v, t) => css`max-height: ${toSize(v, t.sizeUnit)};`),
  t = memoTheme((v, t) => css`top: ${toSize(v, t.posUnit)};`),
  r = memoTheme((v, t) => css`right: ${toSize(v, t.posUnit)};`),
  b = memoTheme((v, t) => css`bottom: ${toSize(v, t.posUnit)};`),
  l = memoTheme((v, t) => css`left: ${toSize(v, t.posUnit)};`),
  pos = {
    relative: css`position: relative;`,
    absolute: css`position: absolute;`,
    fixed: css`position: fixed;`,
    sticky: css`
      position: relative;
      position: sticky;
      top: 0;
    `,
    static: css`position: static;`
  },
  d = {
    block: css`display: block;`,
    flex: css`display: flex;`,
    inlineBlock: css`display: inline-block;`,
    inline: css`display: inline;`,
    none: css`display: none;`
  },
  overflow = {
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

// we don't use rem for border-width because it doesn't have business being relative to the
// size of the font or zoom of the screen
export const bw = memoTheme(
  (value, theme) => {
    if (isDirectional(value) === true) {
      return css`
        border-style: solid;
        ${directionalScale(
        'border-{XYZ}-width',
        theme.borderWidthScale,
        value,
        theme.borderWidthUnit
      )};
      `
    } else {
      return css`
        border-style: solid;
        border-width: ${toSize(theme.borderWidthScale[value], theme.borderWidthUnit)};
      `
    }
  }
)

const borderRadiusDirections = {
  _: ['top-right', 'bottom-right', 'bottom-left', 'top-left'],
  t: ['top-right', 'top-left'],
  r: ['top-right', 'bottom-right'],
  b: ['bottom-right', 'bottom-left'],
  l: ['top-left', 'bottom-left'],
  tl: ['top-left'],
  tr: ['top-right'],
  br: ['bottom-right'],
  bl: ['bottom-left']
}

export const br = memoTheme(
  (value, theme) => {
    const {borderRadiusScale} = theme

    if (isDirectional(value)) {
      return directionalScale(
        'border-{XYZ}-radius',
        borderRadiusScale,
        value,
        theme.borderRadiusUnit,
        borderRadiusDirections,
      )
    } else {
      return css`border-radius: ${toSize(borderRadiusScale[value], theme.borderRadiusUnit)};`
    }
  }
)

export const m = memoTheme(
  (value, theme) => {
    const {spacingScale} = theme

    if (isDirectional(value) === true) {
      return directionalScale(
        'margin-{XYZ}',
        spacingScale,
        value,
        theme.spacingUnit
      )
    } else {
      return css`margin: ${toSize(spacingScale[value], theme.spacingUnit)};`
    }
  }
)

export const p = memoTheme(
  (value, theme) => {
    if (isDirectional(value) === true) {
      return directionalScale(
        'padding-{XYZ}',
        theme.spacingScale,
        value,
        theme.spacingUnit
      )
    } else {
      return css`padding: ${toSize(theme.spacingScale[value], theme.spacingUnit)};`
    }
  }
)
