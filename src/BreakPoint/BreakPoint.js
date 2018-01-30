import React from 'react'
import reduceProps from 'react-cake/es/utils/reduceProps'
import MediaQuery from '../MediaQuery'
import ThemeConsumer from '../ThemeConsumer'
import * as defaultTheme from '../Grid/defaultTheme'
import {getBreakPoint} from '../Grid/utils'
import {getTheme} from '../utils'


function findBreakPoints (props, theme) {
  const breakPoints = []
  const sizes = []

  for (let size in theme.breakpoints) {
    if (props[size] === true) {
      breakPoints.push(theme.breakpoints[size])
      sizes.push(size)
    }
  }

  return [sizes, breakPoints]
}


function getMatches (sizes, rawMatches) {
  const matches = {}

  for (let x = 0; x < rawMatches.length; x++) {
    const size = sizes[x]
    matches[size] = rawMatches[x]
  }

  return matches
}


export default function BreakPoint (props) {
  return (
    <ThemeConsumer path='grid' defaultTheme={defaultTheme}>
      {function (themeProps) {
        const [sizes, queries] = findBreakPoints(props, themeProps.theme)
        const renderProps = reduceProps(props, themeProps.theme.breakpoints)

        return (
          <MediaQuery query={queries} {...renderProps}>
            {function (mqProps) {
              mqProps.matches = getMatches(sizes, mqProps.matches)
              return props.children(mqProps)
            }}
          </MediaQuery>
        )
      }}
    </ThemeConsumer>
  )
}
