import {string} from 'prop-types'
import {implicitNum} from '../PropTypes'


export default {
  // background-color
  bg: string,
  // border radius
  br: implicitNum,
  // border width
  bw: implicitNum,
  // border color
  bc: string,
  // box-shadow
  sh: implicitNum,
  // margin
  m: implicitNum,
  // padding
  p: implicitNum,
  // position
  pos: string,
  // display
  d: string,
  // overflow
  ov: string,
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
