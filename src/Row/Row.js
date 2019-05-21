import React from 'react'
import {css} from '@emotion/core'
import {pos} from '../Box/styles'
import {flex, row, wrap} from '../Flex/styles'
import {useBox} from '../Box'
import createElement from '../createElement'
import useStyles from '../useStyles'


const
  defaultStyles = css([
    'width: 100%;',
    pos.relative,
    flex,
    row.row,
    wrap.wrap
  ]),
  options = {name: 'row', defaultStyles},
  useRow = props => useStyles(props, options),
  Row = React.forwardRef(
    (props, ref) => {
      props = useBox(useRow(props))
      props.ref = ref
      return createElement('div', props)
    }
  )

if (__DEV__) {
  const
    boxPropTypes = require('../Box/propTypes').default,
    flexPropTypes = require('../Flex/propTypes').default
  Row.displayName = 'Row'
  Row.propTypes = Object.assign({}, boxPropTypes, flexPropTypes)
}

export {useRow}
export default Row
