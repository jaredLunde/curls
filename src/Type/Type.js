import React from 'react'
import {FlexBox} from '../Box'
import createComponent, {renderNode} from '../createComponent'
import propTypes from './propTypes'
import * as CSS from './CSS'
import * as defaultTheme from './defaultTheme'


/**
<Type bold xxl color='white' face='primary'>

</Type>
*/
const as = 'span'
const SFC = createComponent({
  name: 'Type',
  propTypes,
  CSS,
  defaultTheme,
  themePath: 'type'
})

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

export default Type