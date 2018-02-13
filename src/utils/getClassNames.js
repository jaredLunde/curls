export default function getClassNames (props, theme, CSS) {
  const classNames = []
  let style
  const propKeys = Object.keys(props)

  for (let x = 0; x < propKeys.length; x++) {
    const propName = propKeys[x]
    const getCSS = CSS[propName]

    if (getCSS === void 0) continue;
    const propVal = props[propName]

    if (propVal !== void 0/*&& propVal !== false*/) {
      const typeofCSS = typeof getCSS
      const result = (
        typeofCSS === 'string' && propVal !== false
        ? getCSS
        : typeofCSS === 'function'
          ? getCSS(propVal, theme, props)
          : getCSS[propVal]
      )

      if (!result) {
        continue
      }

      if (Array.isArray(result) || typeof result === 'string') {
        classNames.push(result)
      }
      else {
        style = style === void 0 ? result : Object.assign(style, result)
      }
    }
  }

  if (classNames.length === 0 && style === void 0) {
    return
  }

  return {classNames, style}
}
