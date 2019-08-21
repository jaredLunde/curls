import {useStyles} from '@style-hooks/core'
import createComponent from '../createComponent'
import * as styles from './styles'

export const useFlex = props => useStyles('flex', styles, props),
  Flex = createComponent('div', useFlex)

if (__DEV__) {
  Flex.displayName = 'Flex'
  Flex.propTypes = require('./propTypes').default
}
