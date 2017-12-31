import PropTypes from 'prop-types'


export default {
  // flex (display: flex)
  flex: PropTypes.bool,
  // flex--fixed (flex(0, 0, auto))
  fixed: PropTypes.bool,
  // flex--fluid (flex(1, 0, auto))
  fluid: PropTypes.bool,
  // flex--first
  first: PropTypes.bool,
  // flex--last
  last: PropTypes.bool,
  // flex--grow
  grow: PropTypes.bool,
  // flex--shrink
  shrink: PropTypes.bool,
  // flex--x
  row: PropTypes.bool,
  // flex--y
  column: PropTypes.bool,
  // flex--x-reverse (row-reverse)
  reverseX: PropTypes.bool,
  // flex--y-reverse (col-reverse)
  reverseY: PropTypes.bool,
  // flex--nowrap
  nowrap: PropTypes.bool,
  // flex--wrap-reverse
  wrapReverse: PropTypes.bool,
  // flex--x-{left|center|right|around|between}
  justify: PropTypes.string,
  // flex--y-{top|center|bottom|around|between|stretch}
  align: PropTypes.string,
  // flex--content-{top|center|bottom|around}
  alignContent: PropTypes.string,
  // flex--self-{top|center|bottom|around}
  alignSelf: PropTypes.string
}
