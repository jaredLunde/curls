import React from 'react'
import Toggle from '@render-props/toggle'
import {withChildren} from '../utils'
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

Drop.propTypes /* remove-proptypes */ = propTypes
export default Drop