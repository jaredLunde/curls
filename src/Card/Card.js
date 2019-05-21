import React from 'react'
import {css} from '@emotion/core'
import {useBox} from '../Box'
import {pos} from '../Box/styles'
import {flex, column} from '../Flex/styles'
import createElement from '../createElement'
import * as defaultTheme from './defaultTheme'
import * as styles from './styles'
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
  options = {name: 'card', styles, defaultTheme},
  useCard = props => useStyles(props, options),
  Card = React.forwardRef(
    (props, ref) => {
      props = useBox(useCard(props))
      props.ref = ref
      return createElement('div', props, defaultCSS)
    }
  )

if (__DEV__) {
  const
    propTypes = require('./propTypes').default,
    boxPropTypes = require('../Box/propTypes').default,
    flexPropTypes = require('../Flex/propTypes').default
  Card.displayName = 'Card'
  Card.propTypes = Object.assign(
    {},
    propTypes,
    boxPropTypes,
    flexPropTypes,
  )
}

export {useCard}
export default Card
