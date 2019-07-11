import {css} from '@emotion/core'
import {toSize, memoValue, memoTheme} from '../utils'
import {d} from '../Box/styles'


const
  ws = /s+/,
  getSizes = (v, unit) => {
    let
      vals = v.trim().split(ws),
      i = 0,
      output = []

    for (; i < vals.length; i++)
      output.push(toSize(vals[i], unit))

    return output.join(' ')
  }

export const
  inline = d.inlineGrid,
  rows = memoTheme((v, t) => css`grid-template-rows: ${getSizes(v, t.templateUnit)};`),
  cols = memoTheme((v, t) => css`grid-template-columns: ${getSizes(v, t.templateUnit)};`),
  autoRows = memoTheme((v, t) => css`grid-auto-rows: ${toSize(v, t.templateUnit)};`),
  autoCols = memoTheme((v, t) => css`grid-auto-columns: ${toSize(v, t.templateUnit)};`),
  gap = memoTheme((v, t) => css`grid-gap: ${getSizes(v, t.gapUnit)};`),
  flow = {
    row: css`grid-auto-flow: row;`,
    column: css`grid-auto-flow: column;`
  },
  areas = memoValue(v => css`grid-template-areas: ${v};`)
