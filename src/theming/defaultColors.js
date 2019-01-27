import * as polished from 'polished'


export default {
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
