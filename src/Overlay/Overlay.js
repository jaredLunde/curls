import React from 'react'
import {css} from '@emotion/core'
import Portalize from 'react-portalize'
import {withChildren} from '../utils'
import {baseIsNotVisible} from '../Fade/styles'
import {flex, align, justify} from '../Flex/styles'
import {pos, ov} from '../Box/styles'
import {useBox} from '../Box'
import Fade from '../Fade'
import * as defaultTheme from './defaultTheme'
import createElement from '../createElement'
import boxPropTypes from '../Box/propTypes'
import flexPropTypes from '../Flex/propTypes'
import useStyles from '../useStyles'


/**
<Overlay visible={isVisible}>
  {function ({isVisible, show, hide, toggle}) {

  }}
</Overlay>
**/
const defaultCSS = css([
  baseIsNotVisible,
  flex,
  align.center,
  justify.center,
  pos.fixed,
  ov.auto,
  ov.touch,
  `
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 1000;
  `
])

const options = {name: 'overlay', defaultTheme}

const Overlay = React.forwardRef(
  ({transition = Fade, portal = false, children, ...props}, ref) => {
    return React.createElement(
      transition,
      withChildren(
        props,
        ({isVisible, show, hide, toggle, ...other}) => {
          other = useBox(useStyles(other, options))
          other.ref = ref
          other.children =
            typeof children === 'function'
              ? children({isVisible, show, hide, toggle})
              : children
          const Component = createElement('div', other, defaultCSS)
          return portal === false
            ? Component
            : <Portalize children={Component} entry={typeof portal === 'function' ? portal : void 0}/>
        }
      )
    )
  }
)

if (__DEV__) {
  Overlay.displayName = 'Overlay'
  Overlay.propTypes = Object.assign({}, boxPropTypes, flexPropTypes)
}

export default Overlay