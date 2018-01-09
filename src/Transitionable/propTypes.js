import {bool, string, number} from 'prop-types'


export default {
  // transition-duration
  veryFast: bool,
  fast: bool,
  med: bool,
  slow: bool,
  verySlow: bool,
  speed: string,
  // transition-timing-functions
  boomerang: bool,
  bounce: bool,
  easeOut: bool,
  easeIn: bool,
  easeInOut: bool,
  swiftMove: bool,
  swifterMove: bool,
  heavyMove: bool,
  swiftIn: bool,
  swiftOut: bool,
  linear: bool,
  easing: string,
  // transition-delay
  delay: number,
  // transition-property
  property: string
}
