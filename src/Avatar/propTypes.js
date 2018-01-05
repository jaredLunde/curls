import PropTypes from 'prop-types'


export default {
  xxs: PropTypes.bool,
  xs: PropTypes.bool,
  sm: PropTypes.bool,
  md: PropTypes.bool,
  lg: PropTypes.bool,
  xl: PropTypes.bool,
  xxl: PropTypes.bool,
  // for object-fit polyfilling
  src: PropTypes.string,
  defaultSrc: PropTypes.string,
  orientation: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  naturalWidth: PropTypes.number,
  naturalHeight: PropTypes.number,
  complete: PropTypes.bool,
  getImage: PropTypes.func.isRequired,
  // imageRef: PropTypes.func,
}
