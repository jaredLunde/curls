import React from 'react'
import {cx} from 'emotion'
import Toggle from 'react-cake/es/Toggle'
import propTypes from '../Slide/propTypes'
import * as CSS from './CSS'
import defaultTheme from '../Slide/defaultTheme'
import Transitionable from '../Transitionable'
import {createSFC, mergeThemeDefaults} from '../utils'


const themePath = 'drop'
const DropSFC = createSFC({name: 'Drop', propTypes, CSS, defaultTheme, themePath})

const dropControls = [
  {name: 'dropIn', value: true},
  {name: 'dropOut', value: null}
]
const transitionProperties = 'visibility, transform, opacity'


export default function Drop ({children, visible = null, ...props}) {
  return (
    <Toggle
      propName='isVisible'
      controls={dropControls}
      initialValue={visible}
      {...props}
    >
      {function (sfcProps) {
        // merges the default colors and sizes to the theme
        const theme = mergeThemeDefaults({
          defaultTheme,
          themePath,
          props: sfcProps,
          defaults: ['defaultSpeed', 'defaultEasing', 'defaultDirection']
        })

        return DropSFC({
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
