import React from 'react'
import {css} from '@emotion/core'
import createComponent, {renderNode} from '../createComponent'
import {FlexBox} from '../Box'
import {flex, row, wrap, align, justify} from '../Flex/styles'
import boxPropTypes from '../Box/propTypes'
import flexPropTypes from '../Flex/propTypes'


const as = 'nav'
const defaultCSS = css`
  ${flex};
  ${row.row};
  ${wrap.no};
  ${align.center};
  ${justify.start};
`
const SFC = createComponent({name: 'navBar'})

const NavBar = React.forwardRef(
  function NavBar (props, innerRef) {
    return SFC({
      as,
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

NavBar.propTypes /* remove-proptypes */ = Object.assign({}, boxPropTypes, flexPropTypes)
export default NavBar
