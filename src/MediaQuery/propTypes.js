import PropTypes from 'prop-types'


export default {
  queries: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object]))
  ]).isRequired,
  children: PropTypes.any.isRequired
}
