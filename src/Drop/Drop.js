import React from 'react'
import Toggle from '@render-props/toggle'
import propTypes from '../Slide/propTypes'
import * as styles from './styles'
import * as defaultTheme from '../Slide/defaultTheme'
import {getDelay} from '../Slide/utils'
import Transitionable from '../Transitionable'
import createComponent from '../createComponent'


const SFC = createComponent({name: 'drop', styles, defaultTheme})
const transitionProperties = 'visibility, transform, opacity'

const Drop = ({children, initiallyVisible = false, visible, ...props}) => (
  <Toggle value={visible} initialValue={initiallyVisible}>
    {function (toggleContext) {
      return SFC({
        isVisible: toggleContext.value,
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

Drop.propTypes /* remove-proptypes */ = propTypes
export default Drop