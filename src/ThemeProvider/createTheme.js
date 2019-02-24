import {getMediaQuery, getTheme, fastMemoize} from '../utils'
import * as polished from 'polished'


export const defaultBreakpoints =  {
  phone: 0,    // only screen and (min-width: 0em)   // 0px
  tablet: 35,  // only screen and (min-width: 35em)  // 560px
  desktop: 80, // only screen and (min-width: 80em)  // 1280px
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
  16
]

export const baseTheme = {
  baseRem: 100,
  breakpoints: defaultBreakpoints,
  colors: defaultColors,
  locals: {},
  mediaQueries: {},
  spacingScale: defaultSpacingScale,
  spacingUnit: 'rem',
  sizeUnit: 'px'
}

const throwThemeError = theme => {
  for (let key in baseTheme) {
    if (theme[key] === void 0 || theme[key] === null || theme[key] === false) {
      throw new Error(`Curls themes must include a global '${key}' property.`)
    }
  }
}

const parseBreakpoints = fastMemoize(
  'parseBreakpoints',
  breakpoints => {
    const parsed = {}

    for (let key in breakpoints) {
      parsed[key] = getMediaQuery(breakpoints[key])
    }

    return parsed
  },
  WeakMap
)

export const mergeTheme = (prevTheme, theme) => {
  theme = getTheme(prevTheme, theme)

  if (__DEV__) {
    throwThemeError(theme)
  }

  theme.breakpoints = parseBreakpoints(theme.breakpoints)
  return theme
}

export default theme => {
  let nextTheme = Object.assign({}, baseTheme, theme)

  if (__DEV__) {
    throwThemeError(nextTheme)
  }

  nextTheme.breakpoints = parseBreakpoints(nextTheme.breakpoints)
  return nextTheme
}
