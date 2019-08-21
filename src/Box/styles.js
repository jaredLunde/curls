import {css} from '@emotion/core'
import {
  directionalScale,
  isDirectional,
  colorize,
  unit,
  memoValue,
  memoTheme,
  get,
} from '../utils'
import * as dT from './defaultTheme'

const ws = /\s+/,
  overflow = {
    auto: css`
      overflow: auto;
    `,
    autoX: css`
      overflow-x: auto;
    `,
    autoY: css`
      overflow-y: auto;
    `,
    hidden: css`
      overflow: hidden;
    `,
    hiddenX: css`
      overflow-x: hidden;
    `,
    hiddenY: css`
      overflow-y: hidden;
    `,
    scroll: css`
      overflow: scroll;
    `,
    scrollX: css`
      overflow-x: scroll;
    `,
    scrollY: css`
      overflow-y: scroll;
    `,
    touch: css`
      -webkit-overflow-scrolling: touch;
    `,
  }

export const ov = memoValue(value => {
    const vals = value.split(ws)
    if (vals.length === 1) return overflow[value]

    let CSS = [],
      i = 0
    for (; i < vals.length; i++)
      CSS.push(
        css`
          ${overflow[vals[i]]};
        `
      )

    return CSS
  }),
  z = memoValue(
    value =>
      css`
        z-index: ${value};
      `
  ),
  sh = memoTheme((v, t) => get(t.box, 'getBoxShadow', dT)(v, t)),
  bg = (value, theme) => colorize('background', value, theme), // colorize memoizes
  bc = (value, theme) => colorize('border-color', value, theme), // colorize memoizes
  w = memoTheme(
    (v, t) =>
      css`
        width: ${unit(v, t.sizeUnit)};
      `
  ),
  h = memoTheme(
    (v, t) =>
      css`
        height: ${unit(v, t.sizeUnit)};
      `
  ),
  minW = memoTheme(
    (v, t) =>
      css`
        min-width: ${unit(v, t.sizeUnit)};
      `
  ),
  minH = memoTheme(
    (v, t) =>
      css`
        min-height: ${unit(v, t.sizeUnit)};
      `
  ),
  maxW = memoTheme(
    (v, t) =>
      css`
        max-width: ${unit(v, t.sizeUnit)};
      `
  ),
  maxH = memoTheme(
    (v, t) =>
      css`
        max-height: ${unit(v, t.sizeUnit)};
      `
  ),
  t = memoTheme(
    (v, t) =>
      css`
        top: ${unit(v, get(t.box, 'posUnit', dT))};
      `
  ),
  r = memoTheme(
    (v, t) =>
      css`
        right: ${unit(v, get(t.box, 'posUnit', dT))};
      `
  ),
  b = memoTheme(
    (v, t) =>
      css`
        bottom: ${unit(v, get(t.box, 'posUnit', dT))};
      `
  ),
  l = memoTheme(
    (v, t) =>
      css`
        left: ${unit(v, get(t.box, 'posUnit', dT))};
      `
  ),
  pos = {
    relative: css`
      position: relative;
    `,
    absolute: css`
      position: absolute;
    `,
    fixed: css`
      position: fixed;
    `,
    sticky: css`
      position: relative;
      position: sticky;
      top: 0;
    `,
    static: css`
      position: static;
    `,
    unset: css`
      position: unset;
    `,
    initial: css`
      position: initial;
    `,
    inherit: css`
      position: inherit;
    `,
  },
  d = {
    block: css`
      display: block;
    `,
    inlineBlock: css`
      display: inline-block;
    `,
    flex: css`
      display: flex;
    `,
    inlineFlex: css`
      display: inline-flex;
    `,
    inline: css`
      display: inline;
    `,
    grid: css`
      display: grid;
    `,
    inlineGrid: css`
      display: inline-grid;
    `,
    table: css`
      display: table;
    `,
    inlineTable: css`
      display: inline-table;
    `,
    tableCell: css`
      display: table-cell;
    `,
    tableRow: css`
      display: table-row;
    `,
    tableColumn: css`
      display: table-column;
    `,
    contents: css`
      display: contents;
    `,
    listItem: css`
      display: list-item;
    `,
    none: css`
      display: none;
    `,
  }

const getDefaultScale = (property, scale, value, scaleUnit) => {
  const scaleValue = scale[value]

  if (__DEV__)
    if (scaleValue === void 0)
      throw new Error(`Unrecognized scale value for '${property}': ${value}`)

  return css`
    ${property}: ${unit(scaleValue, scaleUnit)};
  `
}

export const bw = memoTheme((value, theme) => {
  const bwScale = get(theme.box, 'borderWidthScale', dT),
    bwUnit = get(theme.box, 'borderWidthUnit', dT)

  if (isDirectional(value))
    return css`
      border-style: solid;
      ${directionalScale('border-{XYZ}-width', bwScale, value, bwUnit)};
    `
  else
    return css`
      border-style: solid;
      ${getDefaultScale('border-width', bwScale, value, bwUnit)}
    `
})

const borderRadiusDirections = {
  _: ['top-right', 'bottom-right', 'bottom-left', 'top-left'],
  t: ['top-right', 'top-left'],
  r: ['top-right', 'bottom-right'],
  b: ['bottom-right', 'bottom-left'],
  l: ['top-left', 'bottom-left'],
  tl: ['top-left'],
  tr: ['top-right'],
  br: ['bottom-right'],
  bl: ['bottom-left'],
}

export const br = memoTheme((value, theme) => {
  const brScale = get(theme.box, 'borderRadiusScale', dT),
    brUnit = get(theme.box, 'borderRadiusUnit', dT)

  if (isDirectional(value)) {
    return directionalScale(
      'border-{XYZ}-radius',
      brScale,
      value,
      brUnit,
      borderRadiusDirections
    )
  } else return getDefaultScale('border-radius', brScale, value, brUnit)
})

export const m = memoTheme((value, theme) => {
  const {spacingScale, spacingUnit} = theme

  if (isDirectional(value))
    return directionalScale('margin-{XYZ}', spacingScale, value, spacingUnit)
  else
    return value.trim() === 'auto'
      ? css`
          margin: auto;
        `
      : getDefaultScale('margin', spacingScale, value, spacingUnit)
})

export const p = memoTheme((value, theme) => {
  const {spacingScale, spacingUnit} = theme

  if (isDirectional(value))
    return directionalScale('padding-{XYZ}', spacingScale, value, spacingUnit)
  else return getDefaultScale('padding', spacingScale, value, spacingUnit)
})
