import {bool, string, number, oneOfType} from 'prop-types'


export default {
  // transition-duration (in ms)
  duration: oneOfType([string, number]),
  // transition-timing-functions
  easing: string,
  // transition-delay (in ms)
  delay: number,
  // transition-property
  property: string
}
