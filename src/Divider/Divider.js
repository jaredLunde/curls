import React from 'react'
import {css} from '@emotion/core'
import {withChildren} from '../utils'
import createComponent, {renderNode} from '../createComponent'
import {BasicBox} from '../Box'
import {w, h, d, pos} from '../Box/styles'
import * as defaultTheme from './defaultTheme'
import propTypes from '../Type/propTypes'
import boxPropTypes from '../Box/propTypes'


const as = 'div'
const defaultCSS = css`
  width: 100%;
  min-height: 1px;
  clear: both;
  ${pos.relative};
`
const SFC = createComponent({name: 'divider', defaultTheme})

const Divider = React.forwardRef(
  (props, innerRef) => SFC(
    withChildren(
      props,
      boxProps => {
        boxProps.children = function (nodeProps) {
          nodeProps.children = props.children
          nodeProps.as = nodeProps.as || as
          nodeProps.innerRef = innerRef
          return renderNode(nodeProps, defaultCSS)
        }

        return BasicBox(boxProps)
      }
    )
  )
)

Divider.propTypes /* remove-proptypes */ = Object.assign({}, propTypes, boxPropTypes)
export default Divider
