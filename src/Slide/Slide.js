import React from 'react'
import Toggle from '@render-props/toggle'
import propTypes from './propTypes'
import * as CSS from './CSS'
import * as defaultTheme from './defaultTheme'
import Transitionable from '../Transitionable'
import createComponent from '../createComponent'
import {getDelay} from './utils'


const SFC = createComponent({name: 'Slide', propTypes, CSS, defaultTheme, themePath: 'slide'})
const transitionProperties = 'visibility, transform'

export default function Slide ({
  children,
  initiallyVisible = false,
  visible,
  ...props
}) {
  return (
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
}
