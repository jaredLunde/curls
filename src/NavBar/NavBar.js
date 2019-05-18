import React from 'react'
import {css} from '@emotion/core'
import createComponent, {renderNode} from '../createComponent'
import {withChildren} from '../utils'
import {FlexBox} from '../Box'
import {flex, row, wrap, align, justify} from '../Flex/styles'
import boxPropTypes from '../Box/propTypes'
import flexPropTypes from '../Flex/propTypes'


const defaultCSS = css`
  ${flex};
  ${row.row};
  ${wrap.no};
  ${align.center};
  ${justify.start};
`
const SFC = createComponent({name: 'navBar'})
const NavBar = React.forwardRef(
  (props, innerRef) => SFC(
    withChildren(
      props,
      boxProps => {
        boxProps.children = nodeProps => {
          nodeProps.children = props.children
          nodeProps.as = nodeProps.as || 'nav'
          nodeProps.innerRef = innerRef
          return renderNode(nodeProps, defaultCSS)
        }

        return FlexBox(boxProps)
      }
    )
  )
)

NavBar.propTypes /* remove-proptypes */ = Object.assign({}, boxPropTypes, flexPropTypes)
export default NavBar
