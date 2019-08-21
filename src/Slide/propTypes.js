import {positional, implicitNum} from '../PropTypes'
import transitionable from '../Transitionable/propTypes'

export default {
  ...positional,
  ...transitionable,
  enterDelay: implicitNum,
  leaveDelay: implicitNum,
}
