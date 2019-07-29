import React from 'react'
import {useStyles} from '@style-hooks/core'
import {useBox} from '../Box'
import * as styles from './styles'
import createComponent from '../createComponent'


export const
  options = {name: 'button', styles},
  useButton = props => useStyles(
    Object.assign(
      {
        __buttonStyles: true,
        role: 'button',
        size: 'sm'
      },
      props
    ),
    options
  ),
  Button = createComponent('button', props => useBox(useButton(props)))

if (__DEV__) {
  const
    propTypes = require('./propTypes').default,
    boxPropTypes = require('../Box/propTypes').default,
    flexPropTypes = require('../Flex/propTypes').default
  Button.displayName = 'Button'
  Button.propTypes = Object.assign({}, propTypes, boxPropTypes, flexPropTypes)
}