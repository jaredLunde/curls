import {css} from '@emotion/core'
import memoize from 'trie-memoize'


const getColumnWidth = memoize(
  [Map, Map, Map, Map],
  (theme, size, cols, useFlex) => {
    if (cols === false) {
      return null
    }

    const numColumns = isNaN(theme.columns) === true ? theme.columns[size] : theme.columns
    let x, indexOfSlash = cols.indexOf('/')

    if (indexOfSlash > -1) {
      x = parseInt(cols.substring(0, indexOfSlash))
      cols = cols.substring(indexOfSlash + 1)
    }
    else {
      x = parseInt(cols)
    }

    if (__DEV__) {
      let numX = Array.isArray(cols) && cols[1]

      if (numX && parseInt(numX) !== numColumns) {
        console.warn(`Column count for size '${size}' is ${numColumns}, not ${numX}`)
      }

      if (x < 1 || x > numColumns) {
        console.warn(`Column count for size '${size}' must be between 1 and ${numColumns}`)
      }
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

export const __gridBreakpoints = (v, t, p) => {
  const css = []
  const keys = Object.keys(v)

  for (let i = 0; i < keys.length; i++) {
    const s = keys[i]
    const cols = v[s]
    if (cols === false) continue
    css.push(getColumnWidth(t, s, cols, p.useFlex || false))
  }

  return css
}