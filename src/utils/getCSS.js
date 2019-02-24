import {css as emotionCSS} from '@emotion/core'
import getBreakPointOrder from './getBreakPointOrder'


const getCSS = (fn, value, theme, props) => (
  typeof fn === 'object' && fn.styles !== void 0
    ? value === false
      ? void 0
      : fn
    : typeof fn === 'function'
      ? fn(value, theme, props)
      : fn[value]
)

export default (props, theme, CSS) => {
  let i = 0,
      style,
      mediaQueries,
      css = [],
      propKeys = Object.keys(props)

  for (; i < propKeys.length; i++) {
    const propName = propKeys[i],
          getter = CSS[propName]

    if (getter === void 0) continue
    const propVal = props[propName]

    if (propVal !== void 0/*&& propVal !== false*/) {
      if (__DEV__) {
        if (typeof getter === 'string') {
          throw 'CSS definitions can no longer contain strings. They must return '
            + '@emotion/core css objects.'
        }
      }

      if (propVal.indexOf === void 0 || propVal.indexOf('@') === -1) {
        // these are just regular values, no media queries
        const result = getCSS(getter, propVal, theme, props)

        if (result !== void 0 && result !== null) {
          if (Array.isArray(result) === true) {
            css.push.apply(css, result)
          }
          else if (typeof result === 'object' && result.styles !== void 0) {
            css.push(result)
          }
          else {
            style = style === void 0 ? Object.assign({}, result) : Object.assign(style, result)
          }
        }
      }
      else {
        // this parses values with media queries
        let values = propVal.split(' '),
            j = 0

        for (; j < values.length; j++) {
          if (values[j].length) {
            // <Box p='4@xl 5@xxl 2@sm' flex='@xxl' justify='center@xxl start@xl'>
            const [value, breakPoint] = values[j].split('@')
            const cssValue = getCSS(getter, value, theme, props)

            if (cssValue !== null) {
              if (breakPoint !== void 0 && breakPoint.length > 0) {
                if (__DEV__) {
                  if (getBreakPointOrder(theme.breakPoints).indexOf(breakPoint) === -1) {
                    throw `A break point for '${breakPoint}' was not found in '${bps.join(', ')}'`
                  }
                }

                (mediaQueries = mediaQueries || {})[breakPoint] = mediaQueries[breakPoint] || []

                if (Array.isArray(cssValue) === true) {
                  mediaQueries[breakPoint].push.apply(mediaQueries[breakPoint], cssValue)
                }
                else {
                  mediaQueries[breakPoint].push(cssValue)
                }
              }
              else {
                css.push(cssValue)
              }
            }
          }
        }
      }
    }
  }

  if (mediaQueries !== void 0) {
    // ensures that breakpoints are always ordered in a descending fashion so that
    // shorter max-widths don't get cascaded by longer ones
    const breakPoints = getBreakPointOrder(theme.breakPoints)

    for (i = 0; i < breakPoints.length; i++) {
      const breakPoint = breakPoints[i]

      if (mediaQueries[breakPoint] !== void 0) {
        css.push(emotionCSS`
          @media ${theme.breakPoints[breakPoint]} { ${mediaQueries[breakPoint]}; }
        `)
      }
    }
  }

  return css.length > 0 || style !== void 0 ? {css, style} : void 0
}
