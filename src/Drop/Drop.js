import React from 'react'
import Toggle from 'react-cake/es/Toggle'
import propTypes from '../Slide/propTypes'
import {fadeControls as dropControls} from '../Fade/Fade'
import * as CSS from './CSS'
import * as defaultTheme from '../Slide/defaultTheme'
import Transitionable from '../Transitionable'
import createComponent from '../createComponent'


const SFC = createComponent({name: 'Drop', propTypes, CSS, defaultTheme, themePath: 'drop'})
const transitionProperties = 'visibility, transform, opacity'


export default function Drop ({children, visible = false, ...props}) {
  return (
    <Toggle
      propName='isVisible'
      controls={dropControls}
      initialValue={visible}
      {...props}
    >
      {function (sfcProps) {
        sfcProps.children = function (transProps) {
          transProps.property = transitionProperties
          transProps.children = children

          return Transitionable(transProps)
        }

        return SFC(sfcProps)
      }}
    </Toggle>
  )
}
