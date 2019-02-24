import React from 'react'
import MediaQuery from '../MediaQuery'
import ThemeConsumer from '../ThemeConsumer'
import memoize from 'cdll-memoize'
import * as defaultTheme from '../Grid/defaultTheme'


function getSizes (props, theme) {
  const sizes = []
  const keys = Object.keys(theme.breakPoints)

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
    const breakPoints = []

    for (let size in theme.breakPoints) {
      if (sizes.indexOf(size) > -1) {
        breakPoints.push(theme.breakPoints[size])
      }
    }

    return [sizes, breakPoints]
  },
  {size: 36}
)

// This is about enforcing immutability, not micro-optimizing
function findBreakPoints (props, theme) {
  return memoizedFindBreakPoints(theme, ...getSizes(props, theme))
}


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
    path: 'grid',
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
          {function (mqProps) {
            mqProps.matches = getMatches(sizes, mqProps.matches)
            return props.children(mqProps)
          }}
        </MediaQuery>
      )
    }
  })
}
