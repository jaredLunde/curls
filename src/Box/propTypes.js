import PropTypes from 'prop-types'


export default {
  // background-color
  bg: PropTypes.string,
  // border radius
  br: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  // border width
  bw: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  // border color
  bc: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  // margin
  m: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  // padding
  p: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  // position relative
  pr: PropTypes.bool,
  // position absolute
  pa: PropTypes.bool,
  // position fixed
  pf: PropTypes.bool,
  // display block
  db: PropTypes.bool,
  // display inline block
  dib: PropTypes.bool,
  // display inline
  di: PropTypes.bool,
}
