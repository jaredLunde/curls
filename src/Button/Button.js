import React from 'react'
import {css} from '@emotion/core'
import {useBox} from '../Box'
import {flex, row, align, justify} from '../Flex/styles'
import createElement from '../createElement'
import propTypes from './propTypes'
import * as styles from './styles'
import * as defaultTheme from './defaultTheme'
import boxPropTypes from '../Box/propTypes'
import flexPropTypes from '../Flex/propTypes'
import useStyles from '../useStyles'


const
  defaultCSS = css([
    flex,
    row.row,
    align.center,
    justify.center,
  ]),
  options = {name: 'button', styles, defaultTheme},
  Button = React.forwardRef(
    (props, ref) => {
      props = Object.assign({__buttonStyles: true}, props)
      props = useBox(useStyles(props, options))
      props.ref = ref
      return createElement('button', props, defaultCSS)
    }
  )

if (__DEV__) {
  Button.displayName = 'Button'
  Button.propTypes /* remove-proptypes */ = Object.assign({}, propTypes, boxPropTypes, flexPropTypes)
}

export default Button