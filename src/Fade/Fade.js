import React from 'react'
import Toggle from '@render-props/toggle'
import propTypes from './propTypes'
import * as styles from './styles'
import Transitionable from '../Transitionable'
import createComponent from '../createComponent'
import {getDelay} from '../Slide/utils'


const SFC = createComponent({name: 'fade', styles})
const transitionProperties = 'visibility, opacity'

const Fade = ({
  children,
  from = 0,
  to = 1,
  initiallyVisible = false,
  visible,
  ...props
}) => (
  <Toggle value={visible} initialValue={initiallyVisible}>
    {function (toggleContext) {
      return SFC({
        isVisible: toggleContext.value,
        from,
        to,
        ...props,
        children: function (transProps) {
          transProps.property = transitionProperties
          transProps.children = children
          transProps.show = toggleContext.on
          transProps.hide = toggleContext.off
          transProps.toggle = toggleContext.toggle
          transProps.delay = getDelay(toggleContext.value, props)
          return Transitionable(transProps)
        }
      })
    }}
  </Toggle>
)

Fade.propTypes /* remove-proptypes */ = propTypes
export default Fade