import React from 'react'
import {jsx} from '@emotion/core'
import createComponent from '../createComponent'
import Type from '../Type'
import * as styles from './styles'
import * as defaultTheme from './defaultTheme'
import {withChildren} from '../utils'
import typePropTypes from '../Type/propTypes'
import boxPropTypes from '../Box/propTypes'
import flexPropTypes from '../Flex/propTypes'


const as = 'input'
const SFC = createComponent({name: 'input', defaultTheme, styles})

const Input = React.forwardRef(
  (props, innerRef) => {
    const sfcProps = withChildren(
      Object.assign({__inputStyles: true}, props),
      typeProps => {
        typeProps.as = 'input'
        typeProps.type = typeProps.type || 'text'
        typeProps.ref = innerRef
        return jsx(Type, typeProps)
      },
      true
    )
    return SFC(sfcProps)
  }

)

Input.propTypes /* remove-proptypes */ = Object.assign({}, boxPropTypes, flexPropTypes, typePropTypes)
export default Input