import React from 'react'
import Toggle from '@render-props/toggle'
import {withChildren} from '../utils'
import propTypes from './propTypes'
import * as styles from './styles'
import * as defaultTheme from './defaultTheme'
import Transitionable from '../Transitionable'
import createComponent from '../createComponent'
import {getDelay} from './utils'


const SFC = createComponent({name: 'slide', styles, defaultTheme})
const transitionProperties = 'visibility, transform'

const Slide =({
  children,
  initiallyVisible = false,
  visible,
  ...props
}) => (
  <Toggle value={visible} initialValue={initiallyVisible}>
    {toggleContext => {
      const sfcProps = withChildren(
        props,
        transProps => {
          transProps.property = transitionProperties
          transProps.children = children
          transProps.show = toggleContext.on
          transProps.hide = toggleContext.off
          transProps.toggle = toggleContext.toggle
          transProps.isVisible = toggleContext.value
          transProps.delay = getDelay(toggleContext.value, props)
          return Transitionable(transProps)
        }
      )
      sfcProps.isVisible = toggleContext.value
      return SFC(sfcProps)
    }}
  </Toggle>
)

Slide.propTypes /* remove-proptypes */ = propTypes
export default Slide