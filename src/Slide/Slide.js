import React from 'react'
import Toggle from 'react-cake/es/Toggle'
import {fadeControls as slideControls} from '../Fade/Fade'
import propTypes from './propTypes'
import * as CSS from './CSS'
import * as defaultTheme from './defaultTheme'
import Transitionable from '../Transitionable'
import createComponent from '../createComponent'


const SFC = createComponent({name: 'Slide', propTypes, CSS, defaultTheme, themePath: 'slide'})
const transitionProperties = 'visibility, transform'


export default function Slide ({children, visible = false, ...props}) {
  return (
    <Toggle propName='isVisible' controls={slideControls} initialValue={visible}>
      {function (toggleContext) {
        toggleContext.children = function (transProps) {
          transProps.property = transitionProperties
          transProps.children = children

          return Transitionable(transProps)
        }

        return SFC({...toggleContext, ...props})
      }}
    </Toggle>
  )
}
