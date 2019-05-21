import React from 'react'
import {css} from '@emotion/core'
import {pos} from '../Box/styles'
import {flex, row, wrap} from '../Flex/styles'
import {useBox} from '../Box'
import createElement from '../createElement'
import useStyles from '../useStyles'


const
  defaultCSS = css([
    'width: 100%;',
    pos.relative,
    flex,
    row.row,
    wrap.wrap
  ]),
  options = {name: 'row'},
  Row = React.forwardRef(
    (props, ref) => {
      props = useBox(useStyles(props, options))
      props.ref = ref
      return createElement('div', props, defaultCSS)
    }
  )

if (__DEV__) {
  const
    boxPropTypes = require('../Box/propTypes').default,
    flexPropTypes = require('../Flex/propTypes').default
  Row.displayName = 'Row'
  Row.propTypes = Object.assign({}, boxPropTypes, flexPropTypes)
}

export default Row
