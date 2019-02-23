import {css} from '@emotion/core'
import {toSize, nullIfFalse} from '../utils'

export const flex = css`display: flex;`
export const fixed = css`flex: 0 0 auto;`
export const fluid = css`
  flex: 1 1 auto;
  max-width: none;
`
export const grow = nullIfFalse(value => css`flex-grow: ${value === true ? 1 : value};`)
export const shrink = nullIfFalse(value => css`flex-shrink: ${value === true ? 1 : value};`)
export const basis = nullIfFalse(value => css`flex-basis: ${toSize(value)};`)
export const order = nullIfFalse(value => css`order: ${value};`)

const rowCSS = css`flex-direction: row;`
export const row = {
  [true]: rowCSS,
  row: rowCSS,
  reverse: css`flex-direction: row-reverse;`
}

const columnCSS = css`flex-direction: column;`
export const column = {
  [true]: columnCSS,
  column: columnCSS,
  reverse: css`flex-direction: column-reverse;`
}

const wrapCSS = css`flex-wrap: wrap;`
export const wrap = {
  [true]: wrapCSS,
  wrap: wrapCSS,
  no: css`flex-wrap: nowrap;`,
  reverse: css`flex-wrap: wrap-reverse;`,
}

export const justify = {
  start: css`justify-content: flex-start;`,
  end: css`justify-content: flex-end;`,
  center: css`justify-content: center;`,
  around: css`justify-content: space-around;`,
  between: css`justify-content: space-between;`,
}

export const align = {
  start: css`align-items: flex-start;`,
  end: css`align-items: flex-end;`,
  center: css`align-items: center;`,
  stretch: css`align-items: stretch;`,
  baseline: css`align-items: baseline;`,
}

export const alignContent = {
  start: css`align-content: flex-start;`,
  end: css`align-content: flex-end;`,
  center: css`align-content: center;`,
  stretch: css`align-content: stretch;`,
  between: css`align-content: space-between;`,
  around: css`align-content: space-around;`,
}

export const alignSelf = {
  start: css`align-self: flex-start;`,
  end: css`align-self: flex-end;`,
  center: css`align-self: center;`,
  stretch: css`align-self: stretch;`,
  baseline: css`align-self: baseline;`
}