import React from 'react'
import {css} from '@emotion/core'
import createElement from '../createElement'
import {useBasicBox} from '../Box'
import {pos} from '../Box/styles'
import * as defaultTheme from './defaultTheme'
import useStyles from '../useStyles'


const
  defaultStyles = css([
    'width: 100%;',
    'min-height: 1px;',
    'clear: both;',
    pos.relative
  ]),
  options = {name: 'divider', defaultStyles, defaultTheme},
  useDivider = props => useStyles(props, options),
  Divider = React.forwardRef(
    (props, ref) => {
      props = useBasicBox(useDivider(props))
      props.ref = ref
      return createElement('div', props)
    }
  )

if (__DEV__) {
  const boxPropTypes = require('../Box/propTypes').default
  Divider.displayName = 'Divider'
  Divider.propTypes  = boxPropTypes
}

export {useDivider}
export default Divider
