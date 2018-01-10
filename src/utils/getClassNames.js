export default function getClassNames (props, theme, CSS) {
  const classNames = []
  const propKeys = Object.keys(props)

  for (let x = 0; x < propKeys.length; x++) {
    const propName = propKeys[x]
    const getCSS = CSS[propName]

    if (getCSS === void 0) continue;
    const propVal = props[propName]

    if (propVal !== void 0 && propVal !== false && propName !== 'children') {
      classNames.push(
        typeof getCSS === 'string'
        ? getCSS
        : typeof getCSS === 'function'
          ? getCSS(propVal, theme, props)
          : getCSS[propVal]
      )
    }
  }

  return classNames
}
