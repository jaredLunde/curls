import React from 'react'
import {cx} from 'emotion'
import Toggle from 'react-cake/es/Toggle'
import propTypes from '../Slide/propTypes'
import {getPosFromProps} from '../Slide/utils'
import {fadeControls as dropControls} from '../Fade/Fade'
import * as CSS from './CSS'
import defaultTheme from '../Slide/defaultTheme'
import Transitionable from '../Transitionable'
import {createSFC, getComponentTheme} from '../utils'


const themePath = 'drop'
const DropSFC = createSFC({name: 'Drop', propTypes, CSS, defaultTheme, themePath})
const transitionProperties = 'visibility, transform, opacity'


export default function Drop ({children, visible = null, ...props}) {
  const position = getPosFromProps(props)
  delete props[position]

  return (
    <Toggle
      propName='isVisible'
      controls={dropControls}
      initialValue={visible}
      {...props}
    >
      {function (sfcProps) {
        const theme = getComponentTheme(defaultTheme, sfcProps.theme, themePath)

        const renderProps = {
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
        }

        renderProps[position === void 0 ? theme.defaultDirection : position] = true
        return DropSFC(renderProps)
      }}
    </Toggle>
  )
}
