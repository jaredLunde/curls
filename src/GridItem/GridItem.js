import {useStyles} from '@style-hooks/core'
import {useBox} from '../Box'
import createComponent from '../createComponent'
import * as styles from './styles'


const options = {name: 'gridItem', styles}
export const
  useGridItem = props => useStyles(props, options),
  GridItem = createComponent('div', props => useBox(useGridItem(props)))

if (__DEV__) {
  const
    propTypes = require('./propTypes').default,
    boxPropTypes = require('../Box/propTypes').default,
    flexPropTypes = require('../Flex/propTypes').default
  GridItem.displayName = 'GridItem'
  GridItem.propTypes = Object.assign({}, propTypes, boxPropTypes, flexPropTypes)
}
