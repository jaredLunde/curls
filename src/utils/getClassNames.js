import getCSS from './getCSS'


export default function getClassNames (propTypes, props, theme, CSS) {
  const classNames = []
  const propKeys = Object.keys(props)

  for (let x = 0; x < propKeys.length; x++) {
    const propName = propKeys[x]

    if (propTypes[propName] === void 0) continue;
    const propVal = props[propName]

    if (propVal !== void 0 && propVal !== false && propName !== 'children') {
      const getCSS = CSS[propName]

      classNames.push(
        getCSS === void 0
        ? getCSS
        : typeof getCSS === 'string'
          ? getCSS
          : typeof getCSS === 'function'
            ? getCSS(propVal, theme, props)
            : getCSS[propVal]
      )
    }
  }

  return classNames
}
