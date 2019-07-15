import {css as emotionCSS} from '@emotion/core'
import getBreakpointOrder from './getBreakpointOrder'


const
  splitWs = /(?!\[.*)\s+(?![^[]*?\])/g,
  replaceWs = /^\s+|\s+$|\s+(?=\s)/g
const getCss = (name, fn, value, theme, props) => {
  if (typeof fn === 'object' && (fn.styles !== void 0 || Array.isArray(fn)))
    // boolean prop
    return value === false || value === null ? void 0 : fn
  else if (typeof fn === 'function')
    // functional prop
    return fn(value, theme, props)
  else {
    // enum prop
    const result = fn[value]

    if (__DEV__) {
      // enum value not found
      if (result === void 0 && value !== false && value !== null)
        throw new ReferenceError(
          `Error in enum prop '${name}'. Value '${value}' not found in: ${Object.keys(fn).join(', ')}.`
        )
    }

    return result
  }
}

const maybeAddStyles = (css, maybeCss) => {
  if (maybeCss !== void 0 && maybeCss !== null) {
    // we want our CSS array to be as flat as possible since emotion interpolation
    // will be slower the more nested the array is
    if (Array.isArray(maybeCss) === true)
      css.push.apply(css, maybeCss)
    else
      css.push(maybeCss)
  }
}

export default (styles, theme, props) => {
  let propKeys = Object.keys(props)
  if (propKeys.length === 0) return

  let
    css = [],
    mediaQueries,
    i = 0

  for (; i < propKeys.length; i++) {
    const
      propName = propKeys[i],
      getter = styles[propName]

    if (getter === void 0) continue
    const propVal = props[propName]

    if (propVal !== void 0) {
      if (__DEV__) {
        if (typeof getter === 'string')
          throw 'CSS definitions can no longer contain class names. They must return '
            + '@emotion/core css objects.'
      }

      if (
        propVal === null
        || propVal.indexOf === void 0
        || propVal.indexOf(theme.breakpointsDelimiter) === -1
      ) {
        // these are just regular values, no media queries
        maybeAddStyles(css, getCss(propName, getter, propVal, theme, props))
      }
      else {
        // this parses values with media queries
        let
          values = propVal.replace(replaceWs, '').split(splitWs),
          j = 0

        for (; j < values.length; j++) {
          // <Box p='4@xl 5@xxl 2@sm [x2 y3]@md' flex='@xxl' justify='center@xxl start@xl'>
          let
            indexOfSplit = values[j].indexOf(theme.breakpointsDelimiter),
            value = values[j], breakpoint

          if (indexOfSplit > -1) {
            value = values[j].substring(0, indexOfSplit)
            // removes parentheses from value if there are any
            if (value.indexOf('[') === 0 && value.indexOf(']') === value.length - 1)
              value = value.substring(1, value.length - 1)
            breakpoint = values[j].substring(indexOfSplit + 1)
          }

          // empty values are treated as bools
          value = value.length === 0 ? true : value
          let cssValue = getCss(propName, getter, value, theme, props)

          if (cssValue !== null && cssValue !== void 0) {
            if (breakpoint === void 0 || breakpoint.length === 0)
              maybeAddStyles(css, cssValue)
            else {
              if (__DEV__) {
                // verifies that this is a real breakpoint, but only in development
                const bps = getBreakpointOrder(theme.breakpoints)
                if (bps.indexOf(breakpoint) === -1)
                  throw `A break point for '${breakpoint}' was not found in '${bps.join(', ')}'`
              }

              (mediaQueries = mediaQueries || {})[breakpoint] = mediaQueries[breakpoint] || []
              mediaQueries[breakpoint].push(cssValue)
            }
          }
        }
      }
    }
  }
``
  if (mediaQueries !== void 0) {
    // ensures that breakpoints are always ordered in a descending fashion so that
    // shorter max-widths don't get cascaded by longer ones
    const breakpoints = getBreakpointOrder(theme.breakpoints)

    for (i = 0; i < breakpoints.length; i++) {
      const breakpoint = breakpoints[i]

      if (mediaQueries[breakpoint] !== void 0) {
        css.push(emotionCSS`
          @media ${theme.breakpoints[breakpoint]} { ${mediaQueries[breakpoint]}; }
        `)
      }
    }
  }

  return css.length > 0 ? css : void 0
}
