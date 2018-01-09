import {oneOfType, number, string} from 'prop-types'

const numOrStr = oneOfType([number, string])
// order matters here
export default {
  xxl: numOrStr,
  xl: numOrStr,
  lg: numOrStr,
  md: numOrStr,
  sm: numOrStr,
  xs: numOrStr,
  xxs: numOrStr,
}
