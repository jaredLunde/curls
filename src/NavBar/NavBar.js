import React from 'react'
import {css} from '@emotion/core'
import createElement from '../createElement'
import {flex, row, wrap, align, justify} from '../Flex/styles'
import useStyles from '../useStyles'
import {useBox} from '../Box/Box'


const
  defaultStyles = css([
    flex,
    row.row,
    wrap.no,
    align.center,
    justify.start
  ]),
  options = {name: 'navBar', defaultStyles},
  useNavBar = props => useStyles(props, options),
  NavBar = React.forwardRef(
    (props, ref) => {
      props = useBox(useNavBar(props))
      props.ref = ref
      return createElement('nav', props)
    }
  )

if (__DEV__) {
  const
    boxPropTypes = require('../Box/propTypes').default,
    flexPropTypes = require('../Flex/propTypes').default
  NavBar.displayName = 'NavBar'
  NavBar.propTypes = Object.assign({}, boxPropTypes, flexPropTypes)
}

export {useNavBar}
export default NavBar
