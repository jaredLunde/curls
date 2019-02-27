import React from 'react'
import {FlexBox} from '../Box'
import createComponent, {renderNode} from '../createComponent'
import boxPropTypes from '../Box/propTypes'
import flexPropTypes from '../Flex/propTypes'
import propTypes from './propTypes'
import * as styles from './styles'
import * as defaultTheme from './defaultTheme'


const as = 'span'
const SFC = createComponent({name: 'type', styles, defaultTheme})

const Type = React.forwardRef(
  function Type (props, innerRef) {
    return SFC({
      ...props,
      children: boxProps => {
        boxProps.children = nodeProps => {
          nodeProps.children = props.children
          nodeProps.as = nodeProps.as || as
          nodeProps.innerRef = innerRef
          return renderNode(nodeProps)
        }

        return FlexBox(boxProps)
      }
    })
  }
)

Type.propTypes /* remove-proptypes */ = Object.assign({}, propTypes, boxPropTypes, flexPropTypes)
export default Type