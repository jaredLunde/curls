import React from 'react'
import {jsx} from '@emotion/core'
import createComponent from '../createComponent'
import Type from '../Type'
import * as styles from './styles'
import * as defaultTheme from './defaultTheme'
import typePropTypes from '../Type/propTypes'
import boxPropTypes from '../Box/propTypes'
import flexPropTypes from '../Flex/propTypes'


const as = 'input'
const SFC = createComponent({name: 'input', defaultTheme, styles})

const Input = React.forwardRef(
  function Input (props, innerRef) {
    return SFC({
      __inputStyles: true,
      ...props,
      children: typeProps => {
        typeProps.as = 'input'
        typeProps.type = typeProps.type || 'text'
        typeProps.ref = innerRef
        return jsx(Type, typeProps)
      }
    })
  }

)

Input.propTypes /* remove-proptypes */ = Object.assign({}, boxPropTypes, flexPropTypes, typePropTypes)
export default Input