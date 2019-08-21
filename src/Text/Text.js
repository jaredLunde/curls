import {createStyleHook} from '@style-hooks/core'
import createComponent from '../createComponent'
import {useBox} from '../Box/Box'
import * as styles from './styles'

export const useText = createStyleHook('text', styles),
  Text = createComponent('span', props => useBox(useText(props)))

if (__DEV__) {
  const propTypes = require('./propTypes').default,
    boxPropTypes = require('../Box/propTypes').default,
    flexPropTypes = require('../Flex/propTypes').default
  Text.displayName = 'Text'
  Text.propTypes = Object.assign({}, propTypes, boxPropTypes, flexPropTypes)
}
