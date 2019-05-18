export default (obj, children, mutable = false) => {
  let next = mutable === false ? Object.assign({}, obj) : obj
  next.children = children
  return next
}
