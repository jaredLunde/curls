export default function getIn(obj, path) {
  if (typeof obj === 'object' && obj !== null && path.length === 0) {
    return obj[path]
  }

  return obj
}
