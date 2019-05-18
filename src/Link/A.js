import React from 'react'
import {jsx} from '@emotion/core'
import {withChildren} from '../utils'
import createComponent from '../createComponent'
import Type from '../Type'
import * as styles from './styles'
import * as defaultTheme from './defaultTheme'
import typePropTypes from '../Type/propTypes'
import boxPropTypes from '../Box/propTypes'
import flexPropTypes from '../Flex/propTypes'


const SFC = createComponent({name: 'link', styles, defaultTheme})
const A = React.forwardRef(
  (props, innerRef) => {
    const sfcProps = withChildren(
      Object.assign({__linkStyles: true}, props),
      typeProps => {
        typeProps.as = typeProps.as || 'a'
        typeProps.children = props.children
        typeProps.ref = innerRef
        return jsx(Type, typeProps)
      },
      true
    )
    return SFC(sfcProps)
  }
)

A.propTypes /* remove-proptypes */ = Object.assign({}, boxPropTypes, typePropTypes, flexPropTypes)
export default A