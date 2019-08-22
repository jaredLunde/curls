import {css} from '@emotion/core'
import memoize from 'trie-memoize'
import {get} from '../utils'
import * as dT from './defaultTheme'

const getColumnWidth = memoize(
  [WeakMap, Map, Map, Map],
  (theme, size, cols, useBasis) => {
    if (cols === false) return null
    const columns = get(theme.flexGrid, 'columns', dT),
      numColumns = isNaN(columns) === true ? columns[size] : columns,
      indexOfSlash = cols.indexOf('/'),
      x = parseInt(
        indexOfSlash > -1 ? cols.substring(0, indexOfSlash).trim() : cols
      )

    if (__DEV__) {
      const numX = indexOfSlash > -1 && cols.substring(indexOfSlash + 1).trim()
      if (numX !== false && parseInt(numX) !== numColumns)
        throw new Error(
          `Column count for size '${size}' is ${numColumns}, not ${numX}`
        )

      if (x < 1 || x > numColumns)
        throw new Error(
          `Column count for size '${size}' must be between 1 and ${numColumns}`
        )
    }

    const width = `${(x / numColumns) * 100}%`

    return css`
      @media ${theme.breakpoints[size]} {
        min-width: 0;
        flex-grow: 1;
        max-width: ${width};
        ${useBasis && `flex-basis: ${width}`};
      }
    `
  }
)
export const useBasis = () => null
export const __gridBreakpoints = (v, t, p) => {
  let css = [],
    keys = Object.keys(v),
    i = 0

  for (; i < keys.length; i++) {
    const s = keys[i],
      cols = v[s] !== false ? String(v[s]) : v[s]
    if (cols === false) continue
    css.push(getColumnWidth(t, s, cols, p.useBasis !== false))
  }

  return css
}
