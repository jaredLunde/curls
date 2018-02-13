import React from 'react'
import Toggle from '@render-props/toggle'
import propTypes from './propTypes'
import * as CSS from './CSS'
import * as defaultTheme from './defaultTheme'
import Transitionable from '../Transitionable'
import createComponent from '../createComponent'


const themePath = 'fade'
const SFC = createComponent({name: 'Fade', propTypes, CSS, defaultTheme, themePath})


const transitionProperties = 'visibility, opacity'


export default function Fade ({
  children,
  from = 0,
  to = 1,
  initiallyVisible = false,
  visible,
  ...props
}) {
  return (
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
            return Transitionable(transProps)
          }
        })
      }}
    </Toggle>
  )
}
