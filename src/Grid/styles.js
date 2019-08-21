import {css} from '@emotion/core'
import {unit, memoValue, memoTheme, get} from '../utils'
import {d} from '../Box/styles'
import * as dT from './defaultTheme'

const ws = /\s+/g,
  getSizes = (v, u) => {
    let vals = v.split(ws),
      i = 0,
      output = []

    for (; i < vals.length; i++) output.push(unit(vals[i], u))

    return output.join(' ')
  }

export const inline = d.inlineGrid,
  rows = memoTheme(
    (v, t) =>
      css`
        grid-template-rows: ${getSizes(v, get(t.grid, 'templateUnit', dT))};
      `
  ),
  cols = memoTheme(
    (v, t) =>
      css`
        grid-template-columns: ${getSizes(v, get(t.grid, 'templateUnit', dT))};
      `
  ),
  autoRows = memoTheme(
    (v, t) =>
      css`
        grid-auto-rows: ${unit(v, get(t.grid, 'templateUnit', dT))};
      `
  ),
  autoCols = memoTheme(
    (v, t) =>
      css`
        grid-auto-columns: ${unit(v, get(t.grid, 'templateUnit', dT))};
      `
  ),
  gap = memoTheme(
    (v, t) =>
      css`
        grid-gap: ${getSizes(v, get(t.grid, 'gapUnit', dT))};
      `
  ),
  flow = {
    row: css`
      grid-auto-flow: row;
    `,
    column: css`
      grid-auto-flow: column;
    `,
  },
  areas = memoValue(
    v =>
      css`
        grid-template-areas: ${v};
      `
  )
