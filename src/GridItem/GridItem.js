import React from 'react'
import {useBox} from '../Box'
import useStyles from '../useStyles'
import * as styles from './styles'
import createElement from '../createElement'


const
  options = {name: 'gridItem', styles},
  useGridItem = props => useStyles(props, options),
  GridItem = React.forwardRef((props, ref) => {
    props = useBox(useGridItem(props))
    props.ref = ref
    return createElement('div', props)
  })

if (__DEV__) {
  const propTypes = require('./propTypes').default
  GridItem.displayName = 'GridItem'
  GridItem.propTypes = propTypes
}

export {useGridItem}
export default GridItem
