import React from 'react'
import {cx} from 'emotion'
import Toggle from 'react-cake/es/Toggle'
import propTypes from './propTypes'
import * as CSS from './CSS'
import defaultTheme from './defaultTheme'
import Transitionable from '../Transitionable'
import {createFactory, getComponentTheme} from '../utils'


const themePath = 'fade'
const FadeSFC = createFactory({name: 'Fade', propTypes, CSS, defaultTheme, themePath})

export const fadeControls = [
  {name: 'show', value: true},
  {name: 'hide', value: null}
]

const transitionProperties = 'visibility, opacity'


export default function Fade ({children, visible = null, from = 0, to = 1, ...props}) {
  return (
    <Toggle
      propName='isVisible'
      controls={fadeControls}
      initialValue={visible}
      from={from}
      to={to}
      {...props}
    >
      {function (sfcProps) {
        const theme = getComponentTheme(defaultTheme, sfcProps.theme, themePath)

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
