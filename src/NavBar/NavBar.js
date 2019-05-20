import React from 'react'
import {css} from '@emotion/core'
import createElement from '../createElement'
import {flex, row, wrap, align, justify} from '../Flex/styles'
import boxPropTypes from '../Box/propTypes'
import flexPropTypes from '../Flex/propTypes'
import useStyles from '../useStyles'
import {useBox} from '../Box/Box'


const
  defaultCSS = css([
    flex,
    row.row,
    wrap.no,
    align.center,
    justify.start
  ]),
  options = {name: 'navBar'}

const NavBar = React.forwardRef(
  (props, ref) => {
    props = useBox(useStyles(props, options))
    props.ref = ref
    return createElement('nav', props, defaultCSS)
  }
)

if (__DEV__) {
  NavBar.displayName = 'NavBar'
  NavBar.propTypes = Object.assign({}, boxPropTypes, flexPropTypes)
}

export default NavBar
