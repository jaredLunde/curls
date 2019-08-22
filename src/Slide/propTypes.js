import {positional, implicitNum} from '../PropTypes'
import transitionable from '../Transitionable/propTypes'
import {arrayOf, oneOfType, string} from 'prop-types'

export default {
  ...positional,
  ...transitionable,
  property: oneOfType([string, arrayOf(string)]),
  enterDelay: implicitNum,
  leaveDelay: implicitNum,
}
