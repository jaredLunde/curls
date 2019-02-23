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
  let i,
      css = [],
      style,
      propKeys = Object.keys(props)

  for (let x = 0; x < propKeys.length; x++) {
    const propName = propKeys[x],
          getter = CSS[propName]

    if (getter === void 0) continue
    const propVal = props[propName]

    if (propVal !== void 0/*&& propVal !== false*/) {
      if (__DEV__) {
        if (typeof getter === 'string') {
          throw 'CSS definitions can no longer contain strings. They must return @emotion/core css objects.'
        }
      }

      let result

      if (propVal.indexOf === void 0 || propVal.indexOf('@') === -1) {
        // these are just regular values, no media queries
        result = getCSS(getter, propVal, theme, props)
      }
      else {
        // this parses values with media queries
        let mediaQueries = {},
            plainCSS = [],
            values = propVal.split(' ')

        for (i = 0; i < values.length; i++) {
          if (values[i].length) {
            const [value, breakPoint] = values[i].split('@')
            const cssValue = getCSS(getter, value, theme, props)

            if (cssValue !== null) {
              if (breakPoint !== void 0 && breakPoint.length > 0) {
                mediaQueries[breakPoint] =
                  emotionCSS`@media ${theme.breakPoints[breakPoint]} { ${cssValue} }`
              }
              else {
                css.push(cssValue)
              }
            }
          }
        }

        mediaQueries = getBreakPointOrder(theme.breakPoints)
          .map(bp => mediaQueries[bp])
          .filter(Boolean)
        css = css.concat(plainCSS.length ? plainCSS.concat(mediaQueries) : mediaQueries)
      }

      if (result !== void 0 && result !== null) {
        if (Array.isArray(result)) {
          css = css.concat(result)
        }
        else if (typeof result === 'object' && result.styles !== void 0) {
          css.push(result)
        }
        else {
          style = style === void 0 ? result : Object.assign(style, result)
        }
      }
    }
  }

  if (css.length === 0 && style === void 0) {
    return
  }

  return {css, style}
}
