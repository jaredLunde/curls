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
  easing: string,
  // transition-delay
  delay: number,
  // transition-property
  property: string
}
