import {bool, oneOf, oneOfType, number, string} from 'prop-types'

const boolOrNum = oneOfType([bool, number])
const strOrNum = oneOfType([string, number])
const boolOrStr = oneOfType([bool, string])
export default {
  // flex (display: flex)
  flex: bool,
  // flex--fixed (flex(0, 0, auto))
  fixed: bool,
  // flex--fluid (flex(1, 1, auto))
  fluid: bool,
  // flex--grow
  grow: boolOrNum,
  // flex--shrink
  shrink: boolOrNum,
  // flex-basis
  basis: strOrNum,
  // flex--x
  row: boolOrStr,
  // flex--y
  column: boolOrStr,
  // flex--wrap
  wrap: boolOrStr,
  // flex--x-{left|center|right|around|between}
  justify: oneOf(['start', 'center', 'end', 'around', 'between']),
  // flex--y-{top|center|bottom|around|between|stretch}
  align: oneOf(['start', 'center', 'end', 'around', 'stretch', 'baseline']),
  // order: _
  order: number,
  // flex--content-{top|center|bottom|around}
  alignContent: oneOf(['start', 'center', 'end', 'stretch', 'between', 'around']),
  // flex--self-{top|center|bottom|around}
  alignSelf: oneOf(['start', 'center', 'end', 'stretch', 'baseline'])
}
