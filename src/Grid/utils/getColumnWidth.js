import {css} from 'react-emotion'
import getBreakpoint from './getBreakpoint'


export default function (size, x, theme) {
  x = parseInt(x)
  const width = `${(x / theme.columns[size]) * 100}%`
  const gutterWidth = `${theme.gutter[size]}px`

  return css`
    ${getBreakpoint(size, theme)} {
      padding-left: ${gutterWidth};
      padding-right: ${gutterWidth};
      max-width: ${width};
      flex-basis: ${width};
    }
  `
}
