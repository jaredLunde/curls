import {string} from 'prop-types'
import {boolOrString} from '../PropTypes'


export default {
  // Sizes
  // xxs: bool,
  // xs: bool,
  // sm: bool,
  // md: bool,
  // lg: bool,
  // xl: bool,
  // xxl: bool,
  size: string,
  // Weights
  thin: boolOrString,
  ultraLight: boolOrString,
  light: boolOrString,
  regular: boolOrString,
  medium: boolOrString,
  semiBold: boolOrString,
  bold: boolOrString,
  heavy: boolOrString,
  ultraHeavy: boolOrString,
  // Alignment
  left: boolOrString,
  center: boolOrString,
  right: boolOrString,
  justified: boolOrString,
  // Legibility
  optimizeFor: string,
  antialias: boolOrString,
  // Color
  color: string,
  // Typeface
  face: string,
  // cool
  ellipsis: boolOrString,
}
