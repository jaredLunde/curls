import {css} from 'emotion'
import {dn} from '../../Box/CSS'
import getBreakPoint from './getBreakPoint'


const mediaQuery = q => content => `@media ${q}`


export default function (size, x, theme) {
  x = parseInt(x)
  const width = `${(x / theme.columns[size]) * 100}%`

  return css`
    ${mediaQuery(getBreakPoint(size, theme))} {
      ${x === 0 ? dn : void 0};
      max-width: ${width};
      flex-basis: ${width};
    }
  `
}
