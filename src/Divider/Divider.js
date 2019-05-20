import React from 'react'
import {css} from '@emotion/core'
import createElement from '../createElement'
import {useBasicBox} from '../Box'
import {pos} from '../Box/styles'
import * as defaultTheme from './defaultTheme'
import propTypes from '../Type/propTypes'
import boxPropTypes from '../Box/propTypes'
import useStyles from '../useStyles'


const
  defaultCSS = css([
    'width: 100%;',
    'min-height: 1px;',
    'clear: both;',
    pos.relative
  ]),
  options = {name: 'divider', defaultTheme},
  Divider = React.forwardRef(
    (props, ref) => {
      props = useBasicBox(useStyles(props, options))
      props.ref = ref
      return createElement('div', props, defaultCSS)
    }
  )

if (__DEV__) {
  Divider.displayName = 'Divider'
  Divider.propTypes  = Object.assign({}, propTypes, boxPropTypes)
}

export default Divider
