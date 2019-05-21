import React from 'react'
import {css} from '@emotion/core'
import {useGridBox} from '../Box'
import {pos} from '../Box/styles'
import createElement from '../createElement'
import useStyles from '../useStyles'


const defaultStyles = css([
    'min-width: 0;',
    'flex-grow: 1;',
    pos.relative
  ]),
  options = {name: 'col', defaultStyles},
  useCol = props => useStyles(props, options),
  Col = React.forwardRef(
    (props, ref) => {
      props = useCol(props)
      props.useFlex = true
      props = useGridBox(props)
      props.ref = ref
      return createElement('div', props)
    }
  )

if (__DEV__) {
  const
    boxPropTypes = require('../Box/propTypes').default,
    flexPropTypes = require('../Flex/propTypes').default
  Col.displayName = 'Col'
  Col.propTypes = Object.assign({}, flexPropTypes, boxPropTypes)
}

export {useCol}
export default Col
