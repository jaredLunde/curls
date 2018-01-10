import {bool, string, number, oneOfType} from 'prop-types'


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
  bs: strOrNum,
  // margin
  m: strOrNum,
  // padding
  p: strOrNum,
  // position relative
  pr: bool,
  // position absolute
  pa: bool,
  // position fixed
  pf: bool,
  // position: sticky
  sticky: bool,
  // display block
  db: bool,
  // display inline block
  dib: bool,
  // display inline
  di: bool,
  // display none
  dn: bool,
  // width: 100%
  fw: bool,
  // height: 100%
  fh: bool,
  // clear: both
  cb: bool,
  // -webkit-overflow-scrolling: touch;
  touchScrolling: bool,
  // width: __
  w: strOrNum,
  // height: __
  h: strOrNum,
}
