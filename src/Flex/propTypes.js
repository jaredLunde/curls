import {implicitNum, boolOrNum, boolOrString} from '../PropTypes'


export default {
  // flex (display: flex)
  flex: boolOrString,
  // flex--fixed (flex(0, 0, auto))
  fixed: boolOrString,
  // flex--fluid (flex(1, 1, auto))
  fluid: boolOrString,
  // flex--grow
  grow: boolOrNum,
  // flex--shrink
  shrink: boolOrNum,
  // flex-basis
  basis: implicitNum,
  // flex--x
  row: boolOrString,
  // flex--y
  column: boolOrString,
  // flex--wrap
  wrap: boolOrString,
  // flex--x-{left|center|right|around|between}
  justify: boolOrString,
  // flex--y-{top|center|bottom|around|between|stretch}
  align: boolOrString,
  // order: _
  order: implicitNum,
  // flex--content-{top|center|bottom|around}
  alignContent: boolOrString,
  // flex--self-{top|center|bottom|around}
  alignSelf: boolOrString
}
