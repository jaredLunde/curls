import {bool, string, arrayOf, oneOfType} from 'prop-types'
import {implicitNum, boolOrString} from '../PropTypes'

export default {
  // transition-duration (in ms)
  duration: implicitNum,
  // transition-timing-functions
  easing: boolOrString,
  // transition-delay (in ms)
  delay: implicitNum,
  // transition-property
  property: oneOfType([string, arrayOf(string)]).isRequired,
}
