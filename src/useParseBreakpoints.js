import {useMemo} from 'react'
import {useBreakpoint} from './Breakpoint'
import {useTheme} from '@style-hooks/core'

const splitWs = /(?!\[.*)\s+(?![^[]*?\])/g,
  replaceWs = /^\s+|\s+$|\s+(?=\s)/g

const useParseBreakpoints = prop => {
  const theme = useTheme(),
    props = useMemo(() => {
      let all = [],
        pairs = prop.replace(replaceWs, '').split(splitWs),
        i = 0

      for (; i < pairs.length; i++) {
        const pair = pairs[i],
          index = pair.indexOf(theme.breakpointsDelimiter)

        if (index > -1) {
          const bp = pair.substring(index + 1)
          all.push({
            breakpoint: bp,
            value: pair.substring(0, index),
          })
        } else {
          all.push({breakpoint: null, value: pair, matches: true})
        }
      }

      return all
    }, [prop]),
    {matches} = useBreakpoint(
      props.reduce((a, c) => {
        if (c.breakpoint !== null) {
          a[c.breakpoint] = true
        }
        return a
      }, {})
    )

  return useMemo(() => {
    let nextMatches = [],
      i = 0

    for (; i < props.length; i++) {
      if (props[i].breakpoint === null) {
        props[i].matches = true
        nextMatches.push(props[i])
      } else {
        props[i].matches = matches[props[i].breakpoint]
        nextMatches.push(props[i])
      }
    }

    return nextMatches
  }, [matches, props])
}

export default useParseBreakpoints
