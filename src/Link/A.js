import {css} from '@emotion/core'
import {useStyles} from '@style-hooks/core'
import {useText} from '../Text'
import {useBox} from '../Box'
import createComponent from '../createComponent'
import * as styles from './styles'


const
  defaultStyles = css`text-decoration: none;`,
  options = {name: 'link', styles}
export const
  useLink = props => useStyles(options, Object.assign({__linkStyles: true}, props)),
  A = createComponent('a', props => useBox(useText(useLink(props))), defaultStyles)

if (__DEV__) {
  const
    typePropTypes = require('../Text/propTypes').default,
    boxPropTypes = require('../Box/propTypes').default,
    flexPropTypes = require('../Flex/propTypes').default
  A.displayName = 'A'
  A.propTypes = Object.assign({}, boxPropTypes, typePropTypes, flexPropTypes)
}