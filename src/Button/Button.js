import React from 'react'
import {css} from '@emotion/core'
import {FlexBox} from '../Box'
import {flex, row, align, justify} from '../Flex/styles'
import createComponent, {renderNode} from '../createComponent'
import propTypes from './propTypes'
import * as styles from './styles'
import * as defaultTheme from './defaultTheme'


const as = 'button'
const defaultCSS = css`
  ${flex};
  ${row.row};
  ${align.center};
  ${justify.center};
`
const SFC = createComponent({name: 'button', styles, defaultTheme})

const Button = React.forwardRef(
  function Button (props, innerRef) {
    return SFC({
      __buttonStyles: true,
      innerRef,
      ...props,
      children: function (boxProps) {
        boxProps.children = function (nodeProps) {
          nodeProps.children = props.children
          nodeProps.as = nodeProps.as || as
          return renderNode(nodeProps, defaultCSS)
        }

        return FlexBox(boxProps)
      }
    })
  }
)

Button.propTypes /* remove-proptypes */ = propTypes
export default Button