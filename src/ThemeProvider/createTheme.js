import getTheme from '../utils/getTheme'
import * as polished from 'polished'

export const defaultBreakPoints =  {
  xxs: `only screen and (max-width: 15em)`,      // `only screen and (max-width: 240px)`,
  xs: `only screen and (max-width: 20.25em)`,    // `only screen and (max-width: 324px)`,
  sm: `only screen and (max-width: 39.9375em)`,  // `only screen and (max-width: 639px)`,
  md: `only screen and (max-width: 63.9375em)`,  // `only screen and (max-width: 1023px)`,
  lg: `only screen and (max-width: 79.9375em)`,  // `only screen and (max-width: 1279px)`,
  xl: `only screen and (max-width: 99.9375em)`,  // `only screen and (max-width: 1599px)`,
  xxl: `only screen and (min-width: 0)`,         // `only screen and (min-width: 0)`,
}

export const defaultColors = {
  blue: '#4bb0de',
  green: '#53c492',
  red: '#e56873',
  yellow: '#fffbb8',
  lightestGrey: '#f4f4f5',
  lightGrey: polished.darken(0.15, '#dbdbda'),
  grey: '#666a6f',
  darkGrey: polished.darken(0.10, '#666a6f'),
  darkestGrey: '#1c3d3f',
  black: polished.darken(0.08, '#1c3d3f'),
  white: '#fefeff',
  translucentDark: polished.rgba(0, 0, 0, 0.7),
  translucent: polished.rgba(0, 0, 0, 0.4),
  translucentLight: polished.rgba(0, 0, 0, 0.16),
  translucentWhite: polished.rgba(255, 255, 255, 0.6)
}
export const defaultSpacingScale = [
  0,
  1/4,
  1/2,
  1,
  2,
  4,
  8,
  16,
  32
]

export const baseTheme = {
  colors: defaultColors,
  baseRem: '100%',
  breakPoints: defaultBreakPoints,
  spacingScale: defaultSpacingScale,
  spacingUnit: 'rem',
  sizeUnit: 'px'
}

function throwThemeError (theme) {

  for (let key in baseTheme) {
    if (theme[key] === void 0 || theme[key] === null || theme[key] === false) {
      throw new Error(`Curls themes must include a global '${key}' property.`)
    }
  }
}

export const mergeTheme = (prevTheme, theme) => {
  let nextTheme
  theme = getTheme(prevTheme, theme)
  nextTheme = theme

  if (__DEV__) {
    throwThemeError(nextTheme)
  }

  return nextTheme
}

export default theme => {
  let nextTheme = getTheme(baseTheme, theme)

  if (__DEV__) {
    throwThemeError(nextTheme)
  }

  return nextTheme
}
