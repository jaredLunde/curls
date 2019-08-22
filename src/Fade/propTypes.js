import {implicitNum} from '../PropTypes'
import transitionable from '../Transitionable/propTypes'
import {arrayOf, oneOfType, string} from 'prop-types'

export default {
  ...transitionable,
  property: oneOfType([string, arrayOf(string)]),
  from: implicitNum,
  to: implicitNum,
}
