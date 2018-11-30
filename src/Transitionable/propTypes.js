import {bool, string, number, oneOfType} from 'prop-types'


export default {
  // deprecated, use duration='' instead
  veryFast: bool,
  fast: bool,
  med: bool,
  slow: bool,
  verySlow: bool,
  // transition-duration (in ms)
  duration: oneOfType([string, number]),
  // deprecated -> use duration instead
  speed: string,
  // transition-timing-functions
  easing: string,
  // transition-delay (in ms)
  delay: number,
  // transition-property
  property: string
}
