import {css} from 'emotion'
import getBreakPoint from './getBreakPoint'


const mediaQuery = q => content => `@media ${q}`


export default function (size, x, theme) {
  x = parseInt(x)
  const width = `${(x / theme.columns[size]) * 100}%`

  return css`
    ${mediaQuery(getBreakPoint(size, theme))} {
      max-width: ${width};
      flex-basis: ${width};
    }
  `
}
