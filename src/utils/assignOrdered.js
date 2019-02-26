export default function assignOrdered (defaultProps, kinds, props) {
  let output = {},
      i = 0,
      defaultPropsKeys = Object.keys(defaultProps)

  for (; i < defaultPropsKeys.length; i++) {
    const key = defaultPropsKeys[i]
    if (
      (kinds === void 0 || kinds[key] === void 0)
      || (props === void 0 || props[key] === void 0)
    ){
      output[key] = defaultProps[key]
    }
  }

  if (kinds !== void 0) {
    const kindsKeys = Object.keys(kinds)

    for (i = 0; i < kindsKeys.length; i++) {
      const key = kindsKeys[i]
      if (props === void 0 || props[key] === void 0) {
        output[key] = kinds[key]
      }
    }
  }

  const propsKeys = Object.keys(props)

  for (i = 0; i < propsKeys.length; i++) {
    const key = propsKeys[i]
    output[key] = props[key]
  }

  return output
}
