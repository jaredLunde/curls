import {css} from '@emotion/core'


const getColumnWidth = (size, cols, theme, props) => {
  if (cols === false) {
    return null
  }

  const numColumns = isNaN(theme.columns) === true ? theme.columns[size] : theme.columns
  let x

  if (cols.indexOf('/') > -1) {
    cols = cols.split('/')
    x = parseInt(cols[0])
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
    @media ${theme.breakPoints[size]} {
      max-width: ${width};
      ${props.useFlex && `flex-basis: ${width}`};
    }
  `
}

export const __gridBreakPoints = (v, t, p) => {
  const css = []

  for (let s in v) {
    css.push(getColumnWidth(s, v[s], t, p))
  }

  return css
}