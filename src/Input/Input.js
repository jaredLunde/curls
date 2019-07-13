import React from 'react'
import {css} from '@emotion/core'
import createElement from '../createElement'
import {useBox} from '../Box'
import {useType} from '../Type'
import * as styles from './styles'
import * as defaultTheme from './defaultTheme'
import useStyles from '../useStyles'


const
  defaultStyles = css`
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    outline: none;
    &:focus {
      outline: 0
    }
    
    &[type="number"]::-webkit-inner-spin-button,
    &[type="number"]::-webkit-outer-spin-button {
      height: auto;
    }
  
    &[type='search'] {
      -webkit-appearance: none;
      outline-offset: -2px;
    }
  `,
  options  = {name: 'input', styles, defaultStyles, defaultTheme},
  useInput = props => useStyles(Object.assign({__inputStyles: true}, props), options),
  Input = React.forwardRef(
    (props, ref) => {
      props = useBox(useType(useInput(props)))
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