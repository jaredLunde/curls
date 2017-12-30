import {css} from 'react-emotion'
import getBreakpoint from './getBreakpoint'
import {getTheme, getIn} from '../../utils'
import {columns, gutter} from '../defaultTheme'


export default function (size, x, {theme}) {
  x = parseInt(x)
  const colTheme = getTheme(columns, getIn(theme, 'grid.columns'))
  const gutterTheme = getTheme(gutter, getIn(theme, 'grid.gutter'))
  const width = `${(x / colTheme[size]) * 100}%`
  const gutterWidth = `${gutterTheme[size]}px`

  return css`
    ${getBreakpoint(size, theme)} {
      padding-left: ${gutterWidth};
      padding-right: ${gutterWidth};
      max-width: ${width};
      flex-basis: ${width};
      flex-wrap: wrap;
    }
  `
}
