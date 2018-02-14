import memoize from 'memoize-two-args'
import deepMerge from './deepMerge'
import emptyObj from 'empty/object'


const memoizer = memoize(deepMerge)


export default function (defaultTheme = emptyObj, userTheme) {
  if (userTheme === void 0 || userTheme === null) {
    return defaultTheme
  }
  else if (defaultTheme === emptyObj) {
    return userTheme
  }

  return memoizer(defaultTheme, userTheme)
}
