import {oneOfType, number, string} from 'prop-types'


const numOrStr = oneOfType([number, string])

export default {
  xxl: numOrStr,
  xl: numOrStr,
  lg: numOrStr,
  md: numOrStr,
  sm: numOrStr,
  xs: numOrStr,
  xxs: numOrStr,
}
