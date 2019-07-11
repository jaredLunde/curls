import React from 'react'
import {d} from '../Box/styles'
import {useBox} from '../Box'
import useStyles from '../useStyles'
import * as styles from './styles'
import * as defaultTheme from './defaultTheme'
import createElement from '../createElement'


const
  options = {name: 'grid', defaultStyles: d.grid, styles, defaultTheme},
  useGrid = props => useStyles(props, options),
  Grid = React.forwardRef((props, ref) => {
    props = useBox(useGrid(props))
    props.ref = ref
    return createElement('div', props)
  })

if (__DEV__) {
  const propTypes = require('./propTypes').default
  Grid.displayName = 'Grid'
  Grid.propTypes = propTypes
}

export {useGrid}
export default Grid
