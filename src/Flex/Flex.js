import {css} from '@emotion/core'
import {useStyles} from '@style-hooks/core'
import createComponent from '../createComponent'
import * as styles from './styles'


const
  defaultStyles = css`display: flex;`,
  options = {name: 'flex', styles}
export const
  useFlex = props => useStyles(options, props),
  Flex = createComponent('div', useFlex, defaultStyles)

if (__DEV__) {
  Flex.displayName = 'Flex'
  Flex.propTypes = require('./propTypes').default
}
