import React from 'react'
import MediaQuery from '../MediaQuery'
import ThemeConsumer from '../ThemeConsumer'
import memoizeMap from 'lru-memoize-map'
import memoize from 'memoize-two-args'
import * as defaultTheme from '../Grid/defaultTheme'
import {getBreakPoint} from '../Grid/utils'
import {getTheme} from '../utils'


function getSizes (props, theme) {
  const sizes = []
  const keys = Object.keys(theme.breakpoints)

  for (let x = 0; x < keys.length; x++) {
    const k = keys[x]
    if (props[k] === true) {
      sizes.push(k)
    }
  }

  return sizes
}

const memoizedFindBreakPoints = memoizeMap(36, {multiArgs: true})(
  function (theme, ...sizes) {
    const breakPoints = []

    for (let size in theme.breakpoints) {
      if (sizes.indexOf(size) > -1) {
        breakPoints.push(theme.breakpoints[size])
      }
    }

    return [sizes, breakPoints]
  }
)

// This is about enforcing immutability, not micro-optimizing
function findBreakPoints (props, theme) {
  return memoizedFindBreakPoints(theme, ...getSizes(props, theme))
}


function getMatches_ (sizes, rawMatches) {
  const matches = {}

  for (let x = 0; x < rawMatches.length; x++) {
    const size = sizes[x]
    matches[size] = rawMatches[x]
  }

  return matches
}
// This is about enforcing immutability, not micro-optimizing
const getMatches = memoize(getMatches_)


export default function BreakPoint (props) {
  return ThemeConsumer({
    path: 'grid',
    defaultTheme,
    children: function (themeProps) {
      const [sizes, queries] = findBreakPoints(props, themeProps.theme)

      return (
        <MediaQuery query={queries}>
          {function (mqProps) {
            mqProps.matches = getMatches(sizes, mqProps.matches)
            return props.children(mqProps)
          }}
        </MediaQuery>
      )
    }
  })
}
