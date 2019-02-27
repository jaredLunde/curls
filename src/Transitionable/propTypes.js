import {string, arrayOf, oneOfType} from 'prop-types'
import {implicitNum} from '../PropTypes'


export default {
  // transition-duration (in ms)
  duration: implicitNum,
  // transition-timing-functions
  easing: string,
  // transition-delay (in ms)
  delay: implicitNum,
  // transition-property
  property: oneOfType([string, arrayOf(string)])
}
