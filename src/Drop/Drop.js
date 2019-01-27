import React from 'react'
import Toggle from '@render-props/toggle'
import propTypes from '../Slide/propTypes'
import * as CSS from './CSS'
import * as defaultTheme from '../Slide/defaultTheme'
import {whichDelay} from '../Slide/utils'
import Transitionable from '../Transitionable'
import createComponent from '../createComponent'


const SFC = createComponent({name: 'Drop', propTypes, CSS, defaultTheme, themePath: 'drop'})
const transitionProperties = 'visibility, transform, opacity'

export default function Drop ({
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
            transProps.delay = whichDelay(toggleContext.value, props)
            return Transitionable(transProps)
          }
        })
      }}
    </Toggle>
  )
}
