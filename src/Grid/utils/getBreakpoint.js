import {stripUnit} from 'polished'
import {getTheme, getIn} from '../../utils'
import {breakpoints} from '../defaultTheme'


// export const xs = 'only screen and (max-width: 324px)'
// export const sm = 'only screen and (max-width: 639px)'
// export const md = 'only screen and (max-width: 1023px)'
// export const lg = 'only screen and (max-width: 1359px)'
// export const xl = 'only screen and (min-width: 1360px)'
const mediaQuery = q => content => `@media ${q}`


export default function (size, theme) {
  const bpTheme = getTheme(breakpoints, getIn(theme, 'grid.breakpoints'))
  const px = bpTheme[size]

  switch (size) {
    case 'xxl':
      return mediaQuery(`only screen and (min-width: ${stripUnit(px)}px)`)
    default:
      return mediaQuery(`only screen and (max-width: ${stripUnit(px)}px)`)
  }
}
