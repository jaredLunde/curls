import {rgba, lighten, darken} from 'polished'

const blue = '#30A9DE'
const green = '#2dc483'
const red = '#E53A40'
const yellow = '#ffc952'
const orange = '#e87d34'
const darkOrange = darken(0.10, orange)
const lightestGrey = '#f4f4f5'
const lighterGrey = '#dbdbda'
const grey = '#6f6567'
const darkestGrey = darken(0.20, grey)
const white = '#fefeff'

const defaultColors = {
  blue,
  darkBlue: darken(0.15, blue),
  lightBlue: lighten(0.15, blue),

  green,
  darkGreen: darken(0.15, green),
  lightGreen: lighten(0.15, green),

  red,
  darkRed: darken(0.10, red),
  lightRed: lighten(0.10, red),

  yellow,
  darkYellow: darken(0.10, yellow),
  lightYellow: lighten(0.10, yellow),

  orange,
  darkOrange,
  lightOrange: lighten(0.15, darkOrange),

  lightestGrey,
  lighterGrey,
  lightGrey: darken(0.15, lighterGrey),
  grey,
  darkGrey: darken(0.10, grey),
  darkerGrey: darken(0.15, grey),
  darkestGrey,
  black: darken(0.08, darkestGrey),
  white,
  translucentDark: rgba(0, 0, 0, 0.7),
  translucent: rgba(0, 0, 0, 0.4),
  translucentLight: rgba(0, 0, 0, 0.16),
  translucentWhite: rgba(255, 255, 255, 0.6),
  transparent: rgba(255, 255, 255, 0.0)
}


export default defaultColors
