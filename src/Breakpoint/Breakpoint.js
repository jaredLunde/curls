import React from 'react'
import memoize from 'trie-memoize'
import MediaQuery from '../MediaQuery'
import ThemeConsumer from '../ThemeConsumer'
import {getBreakpointOrder} from '../utils'
import * as defaultTheme from '../Grid/defaultTheme'


const getSizes = (props, theme) => {
  let sizes = [], keys = getBreakpointOrder(theme.breakpoints), i = 0

  for (; i < keys.length; i++) {
    const key = keys[i]
    if (props[key] === true) sizes.push(key)
  }

  return sizes
}


const bpCache = new WeakMap()
const memoizedFindBreakpoints = (breakpoints, sizes) => {
  let pairs =
    bpCache.get(breakpoints),
    sizeKey = sizes.join(',')
  if (pairs !== void 0) {
    let pairKeys = Object.keys(pairs), i = 0
    for (; i < pairKeys.length; i++)
      if (sizeKey === pairKeys[i])
        return pairs[pairKeys[i]]
  }
  else {
    pairs = {}
    bpCache.set(breakpoints, pairs)
  }

  const bps = []

  for (let size in breakpoints)
    if (sizes.indexOf(size) > -1)
      bps.push(breakpoints[size])

  const value = [sizes, bps]
  pairs[sizeKey] = value
  return value
}

// This is about enforcing immutability, not micro-optimizing
const findBreakpoints = (props, theme) =>
  memoizedFindBreakpoints(theme.breakpoints, getSizes(props, theme))

// This is about enforcing immutability, not micro-optimizing
const getMatches = memoize(
  [WeakMap, WeakMap],
  (sizes, rawMatches) => {
    let matches = {}, i = 0

    for (; i < rawMatches.length; i++)
      matches[sizes[i]] = rawMatches[i]

    return matches
  }
)

const getDefaultMatches = (theme, sizes, defaultMatches) => {
  if (defaultMatches === void 0) {
    return sizes.map(s => false)
  }
  else {
    if (typeof defaultMatches === 'function')
      defaultMatches = defaultMatches(theme)
    return sizes.map(size => defaultMatches.indexOf(size) > -1)
  }
}


const Breakpoint = props => ThemeConsumer({
  name: 'grid',
  defaultTheme,
  children: themeProps => {
    const
      [sizes, queries] = findBreakpoints(props, themeProps.theme),
      defaultMatches = getDefaultMatches(themeProps.theme, sizes, props.defaultMatches)

    return (
      <MediaQuery query={queries} defaultMatches={defaultMatches}>
        {mqProps => props.children({...mqProps, matches: getMatches(sizes, mqProps.matches)})}
      </MediaQuery>
    )
  }
})

export default Breakpoint
