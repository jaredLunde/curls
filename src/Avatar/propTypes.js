import {bool, string, number, func} from 'prop-types'


export default {
  xxs: bool,
  xs: bool,
  sm: bool,
  md: bool,
  lg: bool,
  xl: bool,
  xxl: bool,
  // for object-fit polyfilling
  src: string,
  defaultSrc: string,
  orientation: string.isRequired,
  width: number,
  height: number,
  naturalWidth: number,
  naturalHeight: number,
  complete: bool,
  // imageRef: func,
}
