import {css} from '@emotion/core'
import {useStyles} from '@style-hooks/core'
import {pushCss} from '../utils'
import {useText} from '../Text'
import {useBox} from '../Box'
import createComponent from '../createComponent'
import * as styles from './styles'


const defaultStyles = css`text-decoration: none;`
export const
  useLink = props => useStyles(
    'link',
    styles,
    pushCss(Object.assign({__linkStyles: true}, props), defaultStyles)
  ),
  A = createComponent('a', props => useBox(useText(useLink(props))))

if (__DEV__) {
  const
    typePropTypes = require('../Text/propTypes').default,
    boxPropTypes = require('../Box/propTypes').default,
    flexPropTypes = require('../Flex/propTypes').default
  A.displayName = 'A'
  A.propTypes = Object.assign({}, boxPropTypes, typePropTypes, flexPropTypes)
}