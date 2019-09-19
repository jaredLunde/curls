import {useMemo} from 'react'
import {useTheme} from '@style-hooks/core'
import {useBreakpoint} from './Breakpoint'

const splitWs = /(?!\[.*)\s+(?![^[]*?\])/g,
  replaceWs = /^\s+|\s+$|\s+(?=\s)/g

const useParseBreakpoints = propValue => {
  if (typeof propValue !== 'string') return null

  const theme = useTheme(),
    breakpoints = useMemo(() => {
      let nextBreakpoints = [],
        values = propValue.replace(replaceWs, '').split(splitWs),
        i = 0

      for (; i < values.length; i++) {
        const value = values[i],
          index = value.indexOf(theme.breakpointsDelimiter)

        if (index > -1) {
          const bp = value.substring(index + 1)
          nextBreakpoints.push({
            breakpoint: bp,
            value: value.substring(0, index),
          })
        } else {
          nextBreakpoints.push({breakpoint: null, value, matches: true})
        }
      }

      return nextBreakpoints
    }, [propValue]),
    {matches} = useBreakpoint(
      breakpoints.reduce((acc, next) => {
        if (next.breakpoint !== null) {
          acc[next.breakpoint] = true
        }

        return acc
      }, {})
    )

  return useMemo(() => {
    let nextMatches = [],
      i = 0

    for (; i < breakpoints.length; i++) {
      if (breakpoints[i].breakpoint === null) {
        breakpoints[i].matches = true
        nextMatches.push(breakpoints[i])
      } else {
        breakpoints[i].matches = matches[breakpoints[i].breakpoint]
        nextMatches.push(breakpoints[i])
      }
    }

    return nextMatches
  }, [matches, breakpoints])
}

export default useParseBreakpoints
