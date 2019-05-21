import {css} from '@emotion/core'
import memoize from 'trie-memoize'


const getColumnWidth = memoize(
  [WeakMap, Map, Map, Map],
  (theme, size, cols, useFlex) => {
    if (cols === false) return null
    const
      numColumns = isNaN(theme.columns) === true ? theme.columns[size] : theme.columns,
      indexOfSlash = cols.indexOf('/'),
      x = parseInt(indexOfSlash > -1 ? cols.substring(0, indexOfSlash) : cols)

    if (__DEV__) {
      const numX = indexOfSlash > -1 && cols.substring(indexOfSlash + 1)
      if (numX !== false && parseInt(numX) !== numColumns)
        console.warn(`Column count for size '${size}' is ${numColumns}, not ${numX}`)

      if (x < 1 || x > numColumns)
        console.warn(`Column count for size '${size}' must be between 1 and ${numColumns}`)
    }

    const width = `${(x / numColumns) * 100}%`

    return css`
      @media ${theme.breakpoints[size]} {
        max-width: ${width};
        ${useFlex && `flex-basis: ${width}`};
      }
    `
  }
)
export const useFlex = () => null
export const __gridBreakpoints = (v, t, p) => {
  let css = [], keys = Object.keys(v), i = 0

  for (; i < keys.length; i++) {
    const s = keys[i], cols = v[s]
    if (cols === false) continue
    css.push(getColumnWidth(t, s, cols, p.useFlex || false))
  }

  return css
}