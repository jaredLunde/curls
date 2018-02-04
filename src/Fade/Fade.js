import React from 'react'
import Toggle from 'react-cake/es/Toggle'
import propTypes from './propTypes'
import * as CSS from './CSS'
import * as defaultTheme from './defaultTheme'
import Transitionable from '../Transitionable'
import createComponent from '../createComponent'


const themePath = 'fade'
const SFC = createComponent({name: 'Fade', propTypes, CSS, defaultTheme, themePath})

export const fadeControls = [
  {name: 'show', value: true},
  {name: 'hide', value: false}
]

const transitionProperties = 'visibility, opacity'


export default function Fade ({children, visible = false, from = 0, to = 1, ...props}) {
  return (
    <Toggle propName='isVisible' controls={fadeControls} initialValue={visible}>
      {function (toggleContext) {
        toggleContext.children = function (transProps) {
          transProps.property = transitionProperties
          transProps.children = children

          return Transitionable(transProps)
        }

        return SFC({...toggleContext, from, to, ...props})
      }}
    </Toggle>
  )
}
