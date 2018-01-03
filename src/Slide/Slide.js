import React from 'react'
import {cx} from 'emotion'
import Toggle from 'react-cake/es/Toggle'
import propTypes from './propTypes'
import * as CSS from './CSS'
import defaultTheme from './defaultTheme'
import Transitionable from '../Transitionable'
import {createSFC, mergeThemeDefaults} from '../utils'


const themePath = 'slide'
const SlideSFC = createSFC({name: 'Slide', propTypes, CSS, defaultTheme, themePath})

const slideControls = [
  {name: 'slideIn', value: true},
  {name: 'slideOut', value: null}
]
const transitionProperties = 'visibility, transform'


export default function Slide ({children, visible = null, ...props}) {
  return (
    <Toggle
      propName='isVisible'
      controls={slideControls}
      initialValue={visible}
      {...props}
    >
      {function (sfcProps) {
        const theme = mergeThemeDefaults({
          defaultTheme,
          themePath,
          props: sfcProps,
          defaults: ['defaultSpeed', 'defaultEasing', 'defaultDirection']
        })

        return SlideSFC({
          [theme.defaultDirection]: true,
          ...sfcProps,
          children: function (transProps) {
            return Transitionable({
              [theme.defaultSpeed]: true,
              [theme.defaultEasing]: true,
              property: transitionProperties,
              isVisible: sfcProps.isVisible,
              ...transProps,
              children
            })
          }
        })
      }}
    </Toggle>
  )
}
