import {bool, string, number, oneOfType} from 'prop-types'


const numOrStr = oneOfType([number, string])


export default {
  // Sizes
  xxs: bool,
  xs: bool,
  sm: bool,
  md: bool,
  lg: bool,
  xl: bool,
  xxl: bool,
  // border radius
  br: numOrStr,
  // border width
  bw: numOrStr,
  // border color
  bc: string,
  // background
  bg: string,
  // box-shadow
  bs:  numOrStr,
}
