import PropTypes from 'prop-types'


export default {
  inView: PropTypes.func,
  inViewX: PropTypes.func,
  inViewY: PropTypes.func,
  inFullView: PropTypes.func,
  inFullViewX: PropTypes.func,
  inFullViewY: PropTypes.func,
  getViewportSize: PropTypes.func,
  getViewportScroll: PropTypes.func,
  getAspect: PropTypes.func,
  subscribe: PropTypes.func,
  unsubscribe: PropTypes.func,
  viewportWidth: PropTypes.number,
  viewportHeight: PropTypes.number
}
