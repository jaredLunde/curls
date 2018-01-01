import PropTypes from 'prop-types'


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
  br: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  // border width
  bw: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  // border color
  bc: PropTypes.string,
}
