import {bool, string, oneOf} from 'prop-types'


export default {
  // Sizes
  xxs: bool,
  xs: bool,
  sm: bool,
  md: bool,
  lg: bool,
  xl: bool,
  xxl: bool,
  // Weights
  thin: bool,
  ultraLight: bool,
  light: bool,
  regular: bool,
  medium: bool,
  semiBold: bool,
  bold: bool,
  heavy: bool,
  ultraHeavy: bool,
  // Alignment
  left: bool,
  center: bool,
  right: bool,
  ellipsis: bool,
  // Legibility
  optimizeFor: oneOf(['legibility', 'speed']),
  antialias: bool,
  // Color
  color: string,
  // Typeface
  face: string
}
