import React from 'react'
import {css} from '@emotion/core'
import {withChildren, objectWithoutProps} from '../utils'
import {GridBoxRenderProp} from '../Box/Box'
import {pos} from '../Box/styles'
import createComponent, {renderNode} from '../createComponent'
import gridPropTypes from '../Grid/propTypes'
import flexPropTypes from '../Flex/propTypes'
import propTypes from '../Box/propTypes'


const defaultCSS = css`
  min-width: 0;
  flex-grow: 1;
  ${pos.relative};
`
const as = 'div'
const SFC = createComponent({name: 'col'})
const withoutFlex = {useFlex: 0}
const Col = React.forwardRef(
  (props, innerRef) => SFC(
    withChildren(
      props,
      boxProps => {
        boxProps.useFlex = true
        boxProps.children = nodeProps => {
          nodeProps = objectWithoutProps(nodeProps, withoutFlex)
          nodeProps.children = props.children
          nodeProps.as = nodeProps.as || as
          nodeProps.innerRef = innerRef
          return renderNode(nodeProps, defaultCSS)
        }

        return GridBoxRenderProp(boxProps)
      }
    )
  )
)

Col.propTypes /* remove-proptypes */ = Object.assign({}, gridPropTypes, flexPropTypes, propTypes)
export default Col
