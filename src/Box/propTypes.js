import {implicitNum, boolOrString} from '../PropTypes'


export default {
  // background-color
  bg: boolOrString,
  // border radius
  br: implicitNum,
  // border width
  bw: implicitNum,
  // border color
  bc: boolOrString,
  // box-shadow
  sh: implicitNum,
  // margin
  m: implicitNum,
  // padding
  p: implicitNum,
  // position
  pos: boolOrString,
  // display
  d: boolOrString,
  // overflow
  ov: boolOrString,
  // z-index
  z: implicitNum,
  // width: __
  w: implicitNum,
  // height: __
  h: implicitNum,
  // top
  t: implicitNum,
  // right
  r: implicitNum,
  // bottmo
  b: implicitNum,
  // left
  l: implicitNum,
  // min-width
  minW: implicitNum,
  // min-height
  minH: implicitNum,
  // max-width
  maxW: implicitNum,
  // max-height
  maxH: implicitNum,
}
