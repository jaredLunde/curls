import getCSS from './getCSS'


export default function getClassNames (propTypes, props) {
  const classNames = []
  const propKeys = Object.keys(props)

  for (let x = 0; x < propKeys.length; x++) {
    const propName = propKeys[x]

    if (propTypes[propName] === void 0) continue;
    const propVal = props[propName]

    if (propVal !== void 0 && propVal !== false && propName !== 'children') {
      classNames.push(getCSS(propName, propVal, props))
    }
  }

  return classNames
}
