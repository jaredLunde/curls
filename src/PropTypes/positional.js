import PropTypes from 'prop-types'

const pType = PropTypes.oneOf([PropTypes.bool, PropTypes.number, PropTypes.string])
export default {
  fromTop: pType,
  fromRight: pType,
  fromBottom: pType,
  fromLeft: pType,
}
