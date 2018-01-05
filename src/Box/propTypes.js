import PropTypes from 'prop-types'


const strOrNum = PropTypes.oneOfType([PropTypes.number, PropTypes.string])

export default {
  // background-color
  bg: PropTypes.string,
  // border radius
  br: strOrNum,
  // border width
  bw: strOrNum,
  // border color
  bc: PropTypes.string,
  // box-shadow
  bs: strOrNum,
  // margin
  m: strOrNum,
  // padding
  p: strOrNum,
  // position relative
  pr: PropTypes.bool,
  // position absolute
  pa: PropTypes.bool,
  // position fixed
  pf: PropTypes.bool,
  // position: stick
  sticky: PropTypes.bool,
  // display block
  db: PropTypes.bool,
  // display inline block
  dib: PropTypes.bool,
  // display inline
  di: PropTypes.bool,
  // display none
  dn: PropTypes.bool,
  // width: 100%
  fw: PropTypes.bool,
  // height: 100%
  fh: PropTypes.bool,
  // clear: both
  cb: PropTypes.bool,
  // -webkit-overflow-scrolling: touch;
  touchScrolling: PropTypes.bool
}
