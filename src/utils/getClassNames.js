export default function getClassNames (handler, propTypes, {...props}) {
  const classNames = []
  const propKeys = Object.keys(propTypes)
  propKeys.reverse()

  for (let x = 0; x < propKeys.length; x++) {
    const propName = propKeys[x]
    const propVal = props[propName]

    if (propVal !== void 0 && propName !== 'children') {
      classNames.push(handler(propName, propVal, props))
    }
  }

  return classNames
}
