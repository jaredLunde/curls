import {css} from '@emotion/core'
import {useStyles} from '@style-hooks/core'
import {useBox} from '../Box'
import createComponent from '../createComponent'
import * as styles from './styles'
import {pushCss} from '../utils'


const defaultStyles = css`display: grid;`
export const
  useGrid = props => useStyles('grid', styles, pushCss(props, defaultStyles)),
  Grid = createComponent('div', props => useBox(useGrid(props)))

if (__DEV__) {
  const
    propTypes = require('./propTypes').default,
    boxPropTypes = require('../Box/propTypes').default,
    flexPropTypes = require('../Flex/propTypes').default
  Grid.displayName = 'Grid'
  Grid.propTypes = Object.assign({}, propTypes, boxPropTypes, flexPropTypes)
}
