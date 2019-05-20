import React from 'react'
import {css} from '@emotion/core'
import {useBox} from '../Box'
import {pos} from '../Box/styles'
import {flex, column} from '../Flex/styles'
import createElement from '../createElement'
import * as defaultTheme from './defaultTheme'
import propTypes from './propTypes'
import * as styles from './styles'
import boxPropTypes from '../Box/propTypes'
import flexPropTypes from '../Flex/propTypes'
import useStyles from '../useStyles'


const
  defaultCSS = css([
    flex,
    column.column,
    pos.relative,
    `
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
  ]),
  options = {name: 'card', styles, defaultTheme}

const Card = React.forwardRef(
  (props, ref) => {
    props = useBox(useStyles(props, options))
    props.ref = ref
    return createElement('div', props, defaultCSS)
  }
)

if (__DEV__) {
  Card.displayName = 'Card'
  Card.propTypes = Object.assign(
    {},
    propTypes,
    boxPropTypes,
    flexPropTypes,
  )
}

export default Card
