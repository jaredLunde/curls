import {css} from '@emotion/core'
import {useStyles} from '@style-hooks/core'
import {useBox} from '../Box'
import createComponent from '../createComponent'
import * as styles from './styles'


const options = {name: 'grid', styles}
export const
  useGrid = props => useStyles(props, options),
  Grid = createComponent('div', props => useBox(useGrid(props)), css`display: grid`)

if (__DEV__) {
  const
    propTypes = require('./propTypes').default,
    boxPropTypes = require('../Box/propTypes').default,
    flexPropTypes = require('../Flex/propTypes').default
  Grid.displayName = 'Grid'
  Grid.propTypes = Object.assign({}, propTypes, boxPropTypes, flexPropTypes)
}
