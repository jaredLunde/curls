import React from 'react'
import {useStyles} from '@style-hooks/core'
import createComponent from '../createComponent'
import {useBox} from '../Box/Box'
import * as styles from './styles'
import * as defaultTheme from './defaultTheme'


export const
  options = {name: 'type', styles, defaultTheme},
  useType = props => useStyles(props, options),
  Type = createComponent('span', props => useBox(useType(props)))

if (__DEV__) {
  const
    propTypes = require('./propTypes').default,
    boxPropTypes = require('../Box/propTypes').default,
    flexPropTypes = require('../Flex/propTypes').default
  Type.displayName = 'Type'
  Type.propTypes = Object.assign({}, propTypes, boxPropTypes, flexPropTypes)
}