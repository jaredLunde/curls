export default (defaultProps, kinds, props) => {
  let
    i = 0,
    output = {},
    defaultPropsKeys = Object.keys(defaultProps)

  for (; i < defaultPropsKeys.length; i++) {
    const key = defaultPropsKeys[i]
    if (
      (kinds === void 0 || kinds[key] === void 0)
      || (props === void 0 || props[key] === void 0)
    )
      output[key] = defaultProps[key]
  }

  if (kinds !== void 0) {
    const kindsKeys = Object.keys(kinds)

    for (i = 0; i < kindsKeys.length; i++) {
      const key = kindsKeys[i]
      if (props === void 0 || props[key] === void 0)
        output[key] = kinds[key]
    }
  }

  return Object.assign(output, props)
}
