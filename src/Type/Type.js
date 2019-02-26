import React from 'react'
import {FlexBox} from '../Box'
import createComponent, {renderNode} from '../createComponent'
import propTypes from './propTypes'
import * as styles from './styles'
import * as defaultTheme from './defaultTheme'


/**
<Type bold xxl color='white' face='primary'>

</Type>
*/
const as = 'span'
const SFC = createComponent({name: 'type', styles, defaultTheme,})

const Type = React.forwardRef(
  function Type (props, innerRef) {
    return SFC({
      innerRef,
      ...props,
      children: function (boxProps) {
        boxProps.children = function (nodeProps) {
          nodeProps.children = props.children
          nodeProps.as = nodeProps.as || as
          return renderNode(nodeProps)
        }

        return FlexBox(boxProps)
      }
    })
  }
)

Type.propTypes /* remove-proptypes */ = propTypes
export default Type