import React from 'react'
import {css} from '@emotion/core'
import {useBox} from '../Box'
import {flex, row, align, justify} from '../Flex/styles'
import createElement from '../createElement'
import * as styles from './styles'
import * as defaultTheme from './defaultTheme'
import useStyles from '../useStyles'


const
  defaultStyles = css([
    flex,
    row.row,
    align.center,
    justify.center,
  ]),
  options = {name: 'button', styles, defaultStyles, defaultTheme},
  useButton = props => useStyles(Object.assign({__buttonStyles: true}, props), options),
  Button = React.forwardRef(
    (props, ref) => {
      props = useBox(useButton(props))
      props.ref = ref
      props.role = props.role || 'button'
      return createElement('button', props)
    }
  )

if (__DEV__) {
  const
    propTypes = require('./propTypes').default,
    boxPropTypes = require('../Box/propTypes').default,
    flexPropTypes = require('../Flex/propTypes').default
  Button.displayName = 'Button'
  Button.propTypes = Object.assign({}, propTypes, boxPropTypes, flexPropTypes)
}

export {useButton}
export default Button