export default function getCSSProps (props, theme, CSS) {
  let css = []
  let style
  const propKeys = Object.keys(props)

  for (let x = 0; x < propKeys.length; x++) {
    const propName = propKeys[x]
    const getCSS = CSS[propName]

    if (getCSS === void 0) continue;
    const propVal = props[propName]

    if (propVal !== void 0/*&& propVal !== false*/) {
      const typeofCSS = typeof getCSS
      if (__DEV__) {
        if (typeofCSS === 'string') {
          throw 'CSS definitions can no longer contain strings. They must return @emotion/core css objects.'
        }
      }

      const result = (
        typeofCSS === 'object' && getCSS.styles !== void 0
          ? propVal === false
            ? void 0
            : getCSS
          : typeofCSS === 'function'
            ? getCSS(propVal, theme, props)
            : getCSS[propVal]
      )

      if (result !== void 0 && result !== null) {
        if (Array.isArray(result)) {
          css.push.apply(css, result)
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
