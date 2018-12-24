import * as polished from 'polished'

const blue = '#30A9DE'
const green = '#2dc483'
const red = '#E53A40'
const yellow = '#ffc952'
const orange = '#e87d34'
const lightestGrey = '#f4f4f5'
const lighterGrey = '#dbdbda'
const grey = '#6f6567'
const darkestGrey = '#1c3d3f'
const white = '#fefeff'

const defaultColors = {
  blue,
  green,
  red,
  yellow,
  orange,
  lightestGrey,
  lighterGrey,
  lightGrey: polished.darken(0.15, '#dbdbda'),
  grey,
  darkGrey: polished.darken(0.10, '#6f6567'),
  darkerGrey: polished.darken(0.15, '#6f6567'),
  darkestGrey,
  black: polished.darken(0.08, '#1c3d3f'),
  white,
  translucentDark: polished.rgba(0, 0, 0, 0.7),
  translucent: polished.rgba(0, 0, 0, 0.4),
  translucentLight: polished.rgba(0, 0, 0, 0.16),
  translucentWhite: polished.rgba(255, 255, 255, 0.6),
  transparent: polished.rgba(255, 255, 255, 0.0)
}


export default defaultColors
