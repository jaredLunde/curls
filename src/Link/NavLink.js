import React from 'react'
import {useTheme} from '../ThemeConsumer'
import A from './A'


const NavLink = React.forwardRef(
  (props, ref) => {
    const theme = useTheme()

    if (__DEV__)
      if (!theme?.link?.navComponent)
        throw (
          'You must define a `component` property in your '
          + '`theme.link` to use the Link component'
        )

    return React.createElement(A, Object.assign({as: theme.link.navComponent, ref}, props))
  }
)

if (__DEV__) NavLink.displayName = 'NavLink'
export default NavLink