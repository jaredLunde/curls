import {css} from '@emotion/core'
import {useStyles} from '@style-hooks/core'
import * as styles from './styles'
import createComponent from '../createComponent'


const
  defaultStyles = css`display: flex;`,
  options = {name: 'flex', styles}
export const
  useFlex = props => useStyles(props, options),
  Flex = createComponent('div', useFlex, defaultStyles)

if (__DEV__) {
  Flex.displayName = 'Flex'
  Flex.propTypes = require('./propTypes').default
}
