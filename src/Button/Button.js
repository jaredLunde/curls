import React from 'react'
import {css} from '@emotion/core'
import {withChildren} from '../utils'
import {FlexBox} from '../Box'
import {flex, row, align, justify} from '../Flex/styles'
import createComponent, {renderNode} from '../createComponent'
import propTypes from './propTypes'
import * as styles from './styles'
import * as defaultTheme from './defaultTheme'
import boxPropTypes from '../Box/propTypes'
import flexPropTypes from '../Flex/propTypes'


const as = 'button'
const defaultCSS = css`
  ${flex};
  ${row.row};
  ${align.center};
  ${justify.center};
`
const SFC = createComponent({name: 'button', styles, defaultTheme})

const Button = React.forwardRef(
  (props, innerRef) => {
    const sfcProps = withChildren(
      Object.assign({__buttonStyles: true}, props),
      boxProps => {
        boxProps.children = nodeProps => {
          nodeProps.children = props.children
          nodeProps.as = nodeProps.as || as
          nodeProps.innerRef = innerRef
          return renderNode(nodeProps, defaultCSS)
        }

        return FlexBox(boxProps)
      },
      true
    )

    return SFC(sfcProps)
  }
)

Button.propTypes /* remove-proptypes */ = Object.assign({}, propTypes, boxPropTypes, flexPropTypes)
export default Button