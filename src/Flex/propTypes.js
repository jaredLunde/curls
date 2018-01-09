import {bool, string} from 'prop-types'


export default {
  // flex (display: flex)
  flex: bool,
  // flex--fixed (flex(0, 0, auto))
  fixed: bool,
  // flex--fluid (flex(1, 0, auto))
  fluid: bool,
  // flex--first
  first: bool,
  // flex--last
  last: bool,
  // flex--grow
  grow: bool,
  // flex--shrink
  shrink: bool,
  // flex--x
  row: bool,
  // flex--y
  column: bool,
  // flex--x-reverse (row-reverse)
  reverseX: bool,
  // flex--y-reverse (col-reverse)
  reverseY: bool,
  // flex--wrap
  wrap: bool,
  // flex--nowrap
  nowrap: bool,
  // flex--wrap-reverse
  wrapReverse: bool,
  // flex--x-{left|center|right|around|between}
  justify: string,
  // flex--y-{top|center|bottom|around|between|stretch}
  align: string,
  // flex--content-{top|center|bottom|around}
  alignContent: string,
  // flex--self-{top|center|bottom|around}
  alignSelf: string
}
