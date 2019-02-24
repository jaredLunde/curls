export default (initialProps, removedProps) => {
  let props = {},
      i = 0,
      initialKeys = Object.keys(initialProps)

  for (; i < initialKeys.length; i++) {
    const prop = initialKeys[i]

    if (removedProps[prop] === void 0) {
      props[prop] = initialProps[prop]
    }
  }

  return props
}

