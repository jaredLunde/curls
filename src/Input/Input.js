import React from 'react'
import createElement from '../createElement'
import {useBox} from '../Box'
import {useType} from '../Type'
import * as styles from './styles'
import * as defaultTheme from './defaultTheme'
import typePropTypes from '../Type/propTypes'
import boxPropTypes from '../Box/propTypes'
import flexPropTypes from '../Flex/propTypes'
import useStyles from '../useStyles'


const
  options  = {name: 'input', defaultTheme, styles},
  Input = React.forwardRef(
    (props, ref) => {
      props = Object.assign({__inputStyles: true}, props)
      props = useBox(useType(useStyles(props, options)))
      props.type = props.type || 'text'
      props.ref = ref
      return createElement('input', props)
    }
  )

if (__DEV__) {
  Input.displayName = 'Input'
  Input.propTypes = Object.assign({}, boxPropTypes, flexPropTypes, typePropTypes)
}

export default Input