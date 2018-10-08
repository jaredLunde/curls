import React from 'react'
import createComponent from '../createComponent'
import Type from '../Type'
import propTypes from './propTypes'
import * as CSS from './CSS'
import * as defaultTheme from './defaultTheme'
import GLOBAL from './global'
const __GLOBAL = GLOBAL  // prevent tree-shaking from elimating me


const nodeType = 'input'
const SFC = createComponent({name: 'Input', defaultTheme, propTypes, CSS, themePath: 'input'})


export default React.forwardRef(
  function Input (props, innerRef) {
    return SFC({
      __inputStyles: true,
      innerRef,
      ...props,
      children: function (typeProps) {
        typeProps.nodeType = 'input'
        typeProps.type = typeProps.type || 'text'
        return React.createElement(Type, typeProps)
      }
    })
  }

)
