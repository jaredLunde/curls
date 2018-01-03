import PropTypes from 'prop-types'


export default {
  // transition-duration
  veryFast: PropTypes.bool,
  fast: PropTypes.bool,
  med: PropTypes.bool,
  slow: PropTypes.bool,
  verySlow: PropTypes.bool,
  speed: PropTypes.string,
  // transition-timing-functions
  boomerang: PropTypes.bool,
  bounce: PropTypes.bool,
  easeOut: PropTypes.bool,
  easeIn: PropTypes.bool,
  easeInOut: PropTypes.bool,
  swiftMove: PropTypes.bool,
  swifterMove: PropTypes.bool,
  heavyMove: PropTypes.bool,
  swiftIn: PropTypes.bool,
  swiftOut: PropTypes.bool,
  linear: PropTypes.bool,
  easing: PropTypes.string,
  // transition-delay
  delay: PropTypes.number,
  // transition-property
  property: PropTypes.string
}
