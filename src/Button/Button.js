import {useStyles} from '@style-hooks/core'
import createComponent from '../createComponent'
import {useBox} from '../Box'
import * as styles from './styles'


export const
  options = {name: 'button', styles},
  useButton = props => useStyles(
    options,
    Object.assign({__buttonStyles: true}, props),
  ),
  Button = createComponent('button', props => useBox(useButton(props)))

Button.defaultProps = {
  role: 'button',
  size: 'sm',
  br: 5,
  bw: 1
}

if (__DEV__) {
  const
    propTypes = require('./propTypes').default,
    boxPropTypes = require('../Box/propTypes').default,
    flexPropTypes = require('../Flex/propTypes').default
  Button.displayName = 'Button'
  Button.propTypes = Object.assign({}, propTypes, boxPropTypes, flexPropTypes)
}