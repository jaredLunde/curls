import {createLink} from './Link'
const NavLink = createLink('navLink')
export default NavLink

if (__DEV__) {
  const
    typePropTypes = require('../Type/propTypes').default,
    boxPropTypes = require('../Box/propTypes').default,
    flexPropTypes = require('../Flex/propTypes').default
  NavLink.displayName = 'NavLink'
  NavLink.propTypes = Object.assign({}, boxPropTypes, typePropTypes, flexPropTypes)
}