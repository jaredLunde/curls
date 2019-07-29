import emptyObj from 'empty/object'

export default (theme, property, defaultValues = emptyObj) => {
  const value = theme === void 0 ? void 0 : theme[property]
  return value === void 0 ? defaultValues[property] : value
}