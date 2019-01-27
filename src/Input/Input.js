import React from 'react'
import {jsx} from '@emotion/core'
import createComponent from '../createComponent'
import Type from '../Type'
import propTypes from './propTypes'
import * as CSS from './CSS'
import * as defaultTheme from './defaultTheme'


const as = 'input'
const SFC = createComponent({name: 'Input', defaultTheme, propTypes, CSS, themePath: 'input'})

export default React.forwardRef(
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
