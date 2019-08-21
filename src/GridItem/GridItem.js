import {createStyleHook} from '@style-hooks/core'
import {useBox} from '../Box'
import createComponent from '../createComponent'
import * as styles from './styles'


export const
  useGridItem = createStyleHook('gridItem', styles),
  GridItem = createComponent('div', props => useBox(useGridItem(props)))

if (__DEV__) {
  const
    propTypes = require('./propTypes').default,
    boxPropTypes = require('../Box/propTypes').default,
    flexPropTypes = require('../Flex/propTypes').default
  GridItem.displayName = 'GridItem'
  GridItem.propTypes = Object.assign({}, propTypes, boxPropTypes, flexPropTypes)
}
