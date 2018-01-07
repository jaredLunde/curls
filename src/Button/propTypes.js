import PropTypes from 'prop-types'


const numOrStr = PropTypes.oneOfType([PropTypes.number, PropTypes.string])


export default {
  // Sizes
  xxs: PropTypes.bool,
  xs: PropTypes.bool,
  sm: PropTypes.bool,
  md: PropTypes.bool,
  lg: PropTypes.bool,
  xl: PropTypes.bool,
  xxl: PropTypes.bool,
  // border radius
  br: numOrStr,
  // border width
  bw: numOrStr,
  // border color
  bc: PropTypes.string,
  // background
  bg: PropTypes.string,
  // box-shadow
  bs:  numOrStr,
}
