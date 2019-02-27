import React from 'react'
import memoize from 'cdll-memoize'
import MediaQuery from '../MediaQuery'
import ThemeConsumer from '../ThemeConsumer'
import {getBreakpointOrder} from '../utils'
import * as defaultTheme from '../Grid/defaultTheme'


function getSizes (props, theme) {
  const sizes = []
  const keys = getBreakpointOrder(theme.breakpoints)

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (props[key] === true) {
      sizes.push(key)
    }
  }

  return sizes
}

const memoizedFindBreakPoints = memoize(
  function (theme, ...sizes) {
    const breakpoints = []

    for (let size in theme.breakpoints) {
      if (sizes.indexOf(size) > -1) {
        breakpoints.push(theme.breakpoints[size])
      }
    }

    return [sizes, breakpoints]
  },
  {size: 36}
)

// This is about enforcing immutability, not micro-optimizing
const findBreakPoints = (props, theme) => memoizedFindBreakPoints(theme, ...getSizes(props, theme))

function getMatches_ (sizes, rawMatches) {
  const matches = {}

  for (let i = 0; i < rawMatches.length; i++) {
    const size = sizes[i]
    matches[size] = rawMatches[i]
  }

  return matches
}

// This is about enforcing immutability, not micro-optimizing
const getMatches = memoize(getMatches_)

function getDefaultMatches (theme, sizes, defaultMatches) {
  if (defaultMatches === void 0) {
    return sizes.map(s => false)
  }
  else {
    if (typeof defaultMatches === 'function') {
      defaultMatches = defaultMatches(theme)
    }

    return sizes.map(size => defaultMatches.indexOf(size) > -1)
  }
}


export default function Breakpoint (props) {
  return ThemeConsumer({
    name: 'grid',
    defaultTheme,
    children: function (themeProps) {
      const [sizes, queries] = findBreakPoints(props, themeProps.theme)
      const defaultMatches = getDefaultMatches(
        themeProps.theme,
        sizes,
        props.defaultMatches
      )

      return (
        <MediaQuery query={queries} defaultMatches={defaultMatches}>
          {mqProps => props.children({...mqProps, matches: getMatches(sizes, mqProps.matches)})}
        </MediaQuery>
      )
    }
  })
}
