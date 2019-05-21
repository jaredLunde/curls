import React from 'react'
import {css} from '@emotion/core'
import {useGridBox} from '../Box'
import {pos} from '../Box/styles'
import createElement from '../createElement'
import useStyles from '../useStyles'


const defaultCSS = css([
    'min-width: 0;',
    'flex-grow: 1;',
    pos.relative
  ]),
  options = {name: 'col'},
  Col = React.forwardRef(
    (props, ref) => {
      props = useStyles(props, options)
      props.useFlex = true
      props = useGridBox(props)
      props.ref = ref
      return createElement('div', props, defaultCSS)
    }
  )

if (__DEV__) {
  const
    boxPropTypes = require('../Box/propTypes').default,
    flexPropTypes = require('../Flex/propTypes').default
  Col.displayName = 'Col'
  Col.propTypes = Object.assign({}, flexPropTypes, boxPropTypes)
}

export default Col
