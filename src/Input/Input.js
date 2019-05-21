import React from 'react'
import createElement from '../createElement'
import {useBox} from '../Box'
import {useType} from '../Type'
import * as styles from './styles'
import * as defaultTheme from './defaultTheme'
import useStyles from '../useStyles'


const
  options  = {name: 'input', defaultTheme, styles},
  useInput = props => useBox(useType(useStyles(props, options))),
  Input = React.forwardRef(
    (props, ref) => {
      props = Object.assign({__inputStyles: true}, props)
      props = useInput()
      props.type = props.type || 'text'
      props.ref = ref
      return createElement('input', props)
    }
  )

if (__DEV__) {
  const
    typePropTypes = require('../Type/propTypes').default,
    boxPropTypes = require('../Box/propTypes').default,
    flexPropTypes = require('../Flex/propTypes').default
  Input.displayName = 'Input'
  Input.propTypes = Object.assign({}, boxPropTypes, flexPropTypes, typePropTypes)
}

export {useInput}
export default Input