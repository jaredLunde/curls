import {css} from '@emotion/core'
import {memoValue} from '../utils'


export const
  row = memoValue(v => css`grid-row: ${v};`),
  col = memoValue(v => css`grid-column: ${v};`),
  area = memoValue(v => css`grid-area: ${v};`)
