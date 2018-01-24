import {bool, string, number, oneOf, oneOfType} from 'prop-types'


const strOrNum = oneOfType([number, string])

export default {
  // background-color
  bg: string,
  // border radius
  br: strOrNum,
  // border width
  bw: strOrNum,
  // border color
  bc: string,
  // box-shadow
  sh: strOrNum,
  // margin
  m: strOrNum,
  // padding
  p: strOrNum,
  // position
  pos: oneOf(['relative', 'absolute', 'fixed', 'static', 'sticky']),
  // display
  d: oneOf(['block', 'inline', 'inlineBlock', 'none']),
  // overflow
  ov: string,
  // z-index
  z: number,
  // width: __
  w: strOrNum,
  // height: __
  h: strOrNum,
}
