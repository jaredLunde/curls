import React from 'react'
import {jsx} from '@emotion/core'
import createComponent from '../createComponent'
import Type from '../Type'
import propTypes from './propTypes'
import * as CSS from './CSS'
import * as defaultTheme from './defaultTheme'
import './global.css'


const as = 'a'
const SFC = createComponent({name: 'Link', defaultTheme, propTypes, CSS, themePath: 'link'})

export default React.forwardRef(
  function A (props, innerRef) {
    return SFC({
      __linkStyles: true,
      innerRef,
      ...props,
      children: function (typeProps) {
        typeProps.as = typeProps.as || 'a'
        typeProps.children = props.children
        return jsx(Type, typeProps)
      }
    })
  }
)
