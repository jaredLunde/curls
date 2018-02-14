import {css} from 'emotion'
import {d} from '../../Box/CSS'
import getBreakPoint from './getBreakPoint'


const mediaQuery = q => content => `@media ${q}`


export default function (size, x, theme) {
  x = parseInt(x)
  const numColumns = theme.columns[size]

  if (__DEV__) {
    if (x < 0 || x > theme.columns[size]) {
      console.warn(`Column count for grid size '${size}' must be between 0 and ${numColumns}`)
    }
  }

  const width = `${(x / numColumns) * 100}%`
  return css`
    ${mediaQuery(getBreakPoint(size, theme))} {
      ${x === 0 ? d.none : void 0};
      max-width: ${width};
      flex-basis: ${width};
    }
  `
}
