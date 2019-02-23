import {oneOfType, number, string, bool} from 'prop-types'


const numOrStr = oneOfType([number, string])

export default {
  xxl: numOrStr,
  xl: numOrStr,
  lg: numOrStr,
  md: numOrStr,
  sm: numOrStr,
  xs: numOrStr,
  xxs: numOrStr,
  useFlex: bool
}
