import React from 'react'
import * as styles from './styles'
import * as flexStyles from '../Flex/styles'
import {useStyles} from '@style-hooks/core'
import createComponent from '../createComponent'


const
  basicBoxOptions = {name: 'box', styles},
  flexBoxOptions = {name: 'box', styles: Object.assign({}, flexStyles, styles)}

export const
  useBasicBox = props => useStyles(props, basicBoxOptions),
  useBox = props => useStyles(props, flexBoxOptions)

export const
  BasicBox = createComponent('div', useBasicBox),
  Box = createComponent('div', useBox)

if (__DEV__) {
  const
    propTypes = require('./propTypes').default,
    flexPropTypes = require('../Flex/propTypes').default
  BasicBox.displayName = 'BasicBox'
  BasicBox.propTypes = Object.assign({}, propTypes)
  Box.displayName = 'Box'
  Box.propTypes = Object.assign({}, flexPropTypes, propTypes)
}