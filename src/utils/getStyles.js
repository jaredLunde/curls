import {css as emotionCSS} from '@emotion/core'
import getBreakpointOrder from './getBreakpointOrder'


const ws = /\s+/
const getCSS = (fn, value, theme, props) => (
  typeof fn === 'object' && fn.styles !== void 0
    ? value === false
      ? void 0
      : fn
    : typeof fn === 'function'
      ? fn(value, theme, props)
      : fn[value]
)

const maybeAddStyles = (css, style, maybeCss) => {
  if (maybeCss !== void 0 && maybeCss !== null) {
    if (Array.isArray(maybeCss) === true || maybeCss.styles !== void 0) {
      css.push(maybeCss)
    }
    else {
      style.value = style.value === void 0
        ? Object.assign({}, maybeCss)
        : Object.assign(style.value, maybeCss)
    }
  }
}

export default (styles, theme, props) => {
  let i = 0,
      css = [],
      style = {},
      mediaQueries,
      propKeys = Object.keys(props)

  for (; i < propKeys.length; i++) {
    const propName = propKeys[i],
          getter = styles[propName]

    if (getter === void 0) continue
    const propVal = props[propName]

    if (propVal !== void 0) {
      if (__DEV__) {
        if (typeof getter === 'string') {
          throw 'CSS definitions can no longer contain class names. They must return '
            + '@emotion/core css objects.'
        }
      }

      if (propVal.indexOf === void 0 || propVal.indexOf('@') === -1) {
        // these are just regular values, no media queries
        maybeAddStyles(css, style, getCSS(getter, propVal, theme, props))
      }
      else {
        // this parses values with media queries
        let values = propVal.split(ws),
            j = 0

        for (; j < values.length; j++) {
          // <Box p='4@xl 5@xxl 2@sm' flex='@xxl' justify='center@xxl start@xl'>
          const indexOfSplit = values[j].indexOf('@')
          let value = values[j], breakpoint

          if (indexOfSplit > -1) {
            value = values[j].substring(0, indexOfSplit)
            breakpoint = values[j].substring(indexOfSplit + 1)
          }

          // empty values are treated as bools
          value = value.length === 0 ? true : value
          let cssValue = getCSS(getter, value, theme, props)

          if (cssValue !== null && cssValue !== void 0) {
            if (breakpoint === void 0 || breakpoint.length === 0) {
              maybeAddStyles(css, style, cssValue)
            }
            else {
              if (__DEV__) {
                // verifies that this is a real breakpoint, but only in development
                const bps = getBreakpointOrder(theme.breakpoints)

                if (bps.indexOf(breakpoint) === -1) {
                  throw `A break point for '${breakpoint}' was not found in '${bps.join(', ')}'`
                }
              }

              (mediaQueries = mediaQueries || {})[breakpoint] = mediaQueries[breakpoint] || []
              mediaQueries[breakpoint].push(cssValue)
            }
          }
        }
      }
    }
  }

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

  return css.length > 0 || style.value !== void 0 ? {css, style: style.value} : void 0
}
