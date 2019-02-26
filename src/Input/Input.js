import React from 'react'
import {jsx} from '@emotion/core'
import createComponent from '../createComponent'
import Type from '../Type'
import * as styles from './styles'
import * as defaultTheme from './defaultTheme'


const as = 'input'
const SFC = createComponent({name: 'input', defaultTheme, styles})

const Input = React.forwardRef(
  function Input (props, innerRef) {
    return SFC({
      __inputStyles: true,
      innerRef,
      ...props,
      children: function (typeProps) {
        typeProps.as = 'input'
        typeProps.type = typeProps.type || 'text'
        return jsx(Type, typeProps)
      }
    })
  }

)

export default Input