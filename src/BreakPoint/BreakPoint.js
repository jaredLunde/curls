import React from 'react'
import reduceProps from 'react-cake/es/utils/reduceProps'
import MediaQuery from '../MediaQuery'
import defaultTheme from '../Grid/defaultTheme'
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


export default function ({children, theme, ...props}) {
  theme = getTheme(defaultTheme, theme, 'grid')
  const [sizes, queries] = findBreakPoints(props, theme)
  props = reduceProps(props, theme.breakpoints)

  return (
    <MediaQuery query={queries} {...props}>
      {function ({matches, ...props}) {
        props.matches = getMatches(sizes, matches)
        return children(props)
      }}
    </MediaQuery>
  )
}
