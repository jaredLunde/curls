import {createLink} from './Link'
export const NavLink = createLink('navLink')

if (__DEV__) {
  const typePropTypes = require('../Text/propTypes').default,
    boxPropTypes = require('../Box/propTypes').default,
    flexPropTypes = require('../Flex/propTypes').default
  NavLink.displayName = 'NavLink'
  NavLink.propTypes = Object.assign(
    {},
    boxPropTypes,
    typePropTypes,
    flexPropTypes
  )
}
