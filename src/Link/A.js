import React from 'react'
import {jsx} from '@emotion/core'
import createComponent from '../createComponent'
import Type from '../Type'
import propTypes from './propTypes'
import * as styles from './styles'
import * as defaultTheme from './defaultTheme'
import typePropTypes from '../Type/propTypes'
import boxPropTypes from '../Box/propTypes'
import flexPropTypes from '../Flex/propTypes'


const SFC = createComponent({name: 'link', styles, defaultTheme})

const A = React.forwardRef(
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

A.propTypes /* remove-proptypes */ = Object.assign({}, propTypes, boxPropTypes, typePropTypes, flexPropTypes)
export default A