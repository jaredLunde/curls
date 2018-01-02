import {css} from 'emotion'
import getBreakpoint from './getBreakpoint'


export default function (size, x, theme) {
  x = parseInt(x)
  const width = `${(x / theme.columns[size]) * 100}%`

  return css`
    ${getBreakpoint(size, theme)} {
      max-width: ${width};
      flex-basis: ${width};
    }
  `
}
