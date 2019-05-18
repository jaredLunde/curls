import React from 'react'
import {css} from '@emotion/core'
import {withChildren} from '../utils'
import {pos} from '../Box/styles'
import {flex, row, wrap} from '../Flex/styles'
import {FlexBox} from '../Box'
import createComponent, {renderNode} from '../createComponent'
import boxPropTypes from '../Box/propTypes'
import flexPropTypes from '../Flex/propTypes'


const as = 'div'
const defaultCSS = css`
  width: 100%;
  ${pos.relative};
  ${flex};
  ${row.row};
  ${wrap.wrap};
`
const SFC = createComponent({name: 'row'})
const Row = React.forwardRef(
  (props, innerRef) => SFC(
    withChildren(
      props,
      boxProps => {
        boxProps.children = nodeProps => {
          nodeProps.children = props.children
          nodeProps.as = nodeProps.as || as
          nodeProps.innerRef = innerRef
          return renderNode(nodeProps, defaultCSS)
        }

        return FlexBox(boxProps)
      },
    ),
  ),
)

Row.propTypes /* remove-proptypes */ = Object.assign({}, boxPropTypes, flexPropTypes)
export default Row
