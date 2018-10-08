import React from 'react'
import {css, cx} from 'emotion'
import {FlexBox} from '../Box'
import createComponent, {renderNode} from '../createComponent'
import propTypes from './propTypes'
import * as CSS from './CSS'
import * as defaultTheme from './defaultTheme'
import GLOBAL from './global'
const __GLOBAL = GLOBAL  // prevent tree-shaking from elimating me


/**
<Type bold xxl color='white' face='primary'>

</Type>
*/
const nodeType = 'span'
const SFC = createComponent({
  name: 'Type',
  propTypes,
  CSS,
  defaultTheme,
  themePath: 'type'
})

export default React.forwardRef(
  function Type (props, innerRef) {
    return SFC({
      innerRef,
      ...props,
      children: function (boxProps) {
        boxProps.children = function (nodeProps) {
          nodeProps.children = props.children
          nodeProps.nodeType = nodeProps.nodeType || nodeType
          return renderNode(nodeProps)
        }

        return FlexBox(boxProps)
      }
    })
  }
)

export const H1 = React.forwardRef(
  function H1 (props, innerRef) {
    return React.createElement(Type, {nodeType: 'h1', xxl: true, innerRef, ...props})
  }
)

export const H2 = React.forwardRef(
  function H2 (props, innerRef) {
    return React.createElement(Type, {nodeType: 'h2', xl: true, innerRef, ...props})
  }
)

export const H3 = React.forwardRef(
  function H3 (props, innerRef) {
    return React.createElement(Type, {nodeType: 'h3', lg: true, innerRef, ...props})
  }
)

export const H4 = React.forwardRef(
  function H4 (props, innerRef) {
    return React.createElement(Type, {nodeType: 'h4', md: true, innerRef, ...props})
  }
)

export const H5 = React.forwardRef(
  function H5 (props, innerRef) {
    return React.createElement(Type, {nodeType: 'h5', md: true, innerRef, ...props})
  }
)

export const H6 = React.forwardRef(
  function H6 (props, innerRef) {
    return React.createElement(Type, {nodeType: 'h6', md: true, innerRef, ...props})
  }
)

const p = css`
  word-break: break-word;
  line-height: 1.4;
`

export const P = React.forwardRef(
  function P (props, innerRef) {
    return React.createElement(
      Type, {
        nodeType: 'p',
        m: 'b2',
        innerRef,
        ...props,
        className: cx(p, props.className)
      }
    )
  }
)
