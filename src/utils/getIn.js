export default function getIn(obj, path) {
  if (typeof obj === 'object' && obj !== null && path.length === 0) {
    return obj[path]
  }

  return obj
  /**
  const parts = path.split('.')
  let out = obj

  for (let x = 0; x < parts.length; x++) {
    obj = obj[parts[x]]

    if (obj === void 0) {
      return obj
    }
  }

  return obj
  */
}
