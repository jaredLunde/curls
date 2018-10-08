import React from 'react'
import createComponent from '../createComponent'
import Type from '../Type'
import propTypes from './propTypes'
import * as CSS from './CSS'
import * as defaultTheme from './defaultTheme'
import GLOBAL from './global'
const __GLOBAL = GLOBAL  // prevent tree-shaking from elimating me


const nodeType = 'a'
const SFC = createComponent({name: 'Link', defaultTheme, propTypes, CSS, themePath: 'link'})


export default React.forwardRef(
  function A (props, innerRef) {
    return SFC({
      __linkStyles: true,
      innerRef,
      ...props,
      children: function (typeProps) {
        typeProps.nodeType = typeProps.nodeType || 'a'
        typeProps.children = props.children
        return React.createElement(Type, typeProps)
      }
    })
  }
)
