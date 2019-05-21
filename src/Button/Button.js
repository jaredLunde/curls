import React from 'react'
import {css} from '@emotion/core'
import {useBox} from '../Box'
import {flex, row, align, justify} from '../Flex/styles'
import createElement from '../createElement'
import * as styles from './styles'
import * as defaultTheme from './defaultTheme'
import useStyles from '../useStyles'


const
  defaultCSS = css([
    flex,
    row.row,
    align.center,
    justify.center,
  ]),
  options = {name: 'button', styles, defaultTheme},
  useButton = props => useBox(useStyles(props, options)),
  Button = React.forwardRef(
    (props, ref) => {
      props = Object.assign({__buttonStyles: true}, props)
      props = useButton(props)
      props.ref = ref
      return createElement('button', props, defaultCSS)
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