export default (obj, path) =>
  typeof obj === 'object' && obj !== null && path.length === 0
    ? obj[path]
    : obj