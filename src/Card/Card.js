import React from 'react'
import {css} from '@emotion/core'
import {withChildren} from '../utils'
import {FlexBox} from '../Box'
import {pos, w} from '../Box/styles'
import {flex, column} from '../Flex/styles'
import createComponent, {renderNode} from '../createComponent'
import * as defaultTheme from './defaultTheme'
import propTypes from './propTypes'
import * as styles from './styles'
import boxPropTypes from '../Box/propTypes'
import flexPropTypes from '../Flex/propTypes'


const defaultCSS = css`
  ${flex};
  ${column.column};
  ${pos.relative};
  min-width: 0;

  & > *:not(.button):not(button):not([role=button]):first-child {
    border-top: 0;
  }

  & > *:not(.button):not(button):not([role=button]):last-child {
    border-bottom: 0;
  }

  & > *:first-child {
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
  }

  & > *:last-child {
    border-bottom-width: 0;
    border-left-width: 0;
    border-right-width: 0;
  }

  & > * {
    width: 100%;
  }

  & > img,
  & > figure,
  & > video {
    width: 100%;
    height: auto;
    margin: 0 auto;
    padding: 0;
    display: block;
  }
`


const as = 'div'
const SFC = createComponent({name: 'card', styles, defaultTheme})
const Card = React.forwardRef(
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

Card.propTypes /* remove-proptypes */ = Object.assign(
  {},
  propTypes,
  boxPropTypes,
  flexPropTypes,
)
export default Card
