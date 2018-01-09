import React from 'react'
import {cx} from 'emotion'
import Toggle from 'react-cake/es/Toggle'
import {fadeControls as slideControls} from '../Fade/Fade'
import propTypes from './propTypes'
import * as CSS from './CSS'
import defaultTheme from './defaultTheme'
import Transitionable from '../Transitionable'
import {createFactory, getComponentTheme} from '../utils'
import {getPosFromProps} from './utils'


const themePath = 'slide'
const SlideSFC = createFactory({name: 'Slide', propTypes, CSS, defaultTheme, themePath})
const transitionProperties = 'visibility, transform'


export default function Slide ({children, visible = null, ...props}) {
  const position = getPosFromProps(props)
  delete props[position]

  return (
    <Toggle
      propName='isVisible'
      controls={slideControls}
      initialValue={visible}
      {...props}
    >
      {function (sfcProps) {
        const theme = getComponentTheme(defaultTheme, sfcProps.theme, themePath)

        const renderProps = {
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
        return SlideSFC(renderProps)
      }}
    </Toggle>
  )
}
