import React from 'react'
import {NavLink as RouterNavLink} from 'react-router-dom'
import A from './A'


export default React.forwardRef(
  function NavLink (props, innerRef) {
    return A({nodeType: RouterNavLink, innerRef, ...props})
  }
)
