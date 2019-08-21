import {createStyleHook} from '@style-hooks/core'
import createComponent from '../createComponent'
import * as flexStyles from '../Flex/styles'
import * as styles from './styles'


export const
  useBasicBox = createStyleHook('box', styles),
  useBox = createStyleHook('box', Object.assign({}, flexStyles, styles))

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