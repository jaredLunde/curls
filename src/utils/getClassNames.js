export default function getClassNames (handler, propTypes, props) {
  // has side effects on props
  const classNames = []
  const propKeys = Object.keys(propTypes)
  propKeys.reverse()

  for (let x = 0; x < propKeys.length; x++) {
    const key = propKeys[x]
    const propVal = props[key]
    if (propVal !== void 0) {
      classNames.push(handler(key, propVal, props))
      delete props[key]
    }
  }

  return classNames
}
