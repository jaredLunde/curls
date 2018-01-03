import React from 'react'
import {cx} from 'emotion'
import Toggle from 'react-cake/es/Toggle'
import propTypes from './propTypes'
import * as CSS from './CSS'
import defaultTheme from './defaultTheme'
import Transitionable from '../Transitionable'
import {createSFC, mergeThemeDefaults} from '../utils'


const themePath = 'fade'
const FadeSFC = createSFC({name: 'Fade', propTypes, CSS, defaultTheme, themePath})

const fadeControls = [
  {name: 'fadeIn', value: true},
  {name: 'fadeOut', value: null}
]

const transitionProperties = 'visibility, opacity'


export default function Fade ({children, visible = null, ...props}) {
  return (
    <Toggle
      propName='isVisible'
      controls={fadeControls}
      initialValue={visible}
      {...props}
    >
      {function (sfcProps) {
        // merges the default colors and sizes to the theme
        const theme = mergeThemeDefaults({
          defaultTheme,
          themePath,
          props: sfcProps,
          defaults: ['defaultSpeed', 'defaultEasing']
        })

        return FadeSFC({
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
