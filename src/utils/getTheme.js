import memoize from 'memoize-two-args'
import emptyObj from 'empty/object'
import deepMerge from './deepMerge'


const memoizer = memoize(deepMerge)


export default function getTheme (defaultTheme = emptyObj, userTheme) {
  if (userTheme === void 0 || userTheme === null) {
    return defaultTheme
  }
  else if (defaultTheme === emptyObj) {
    return userTheme
  }

  return memoizer(defaultTheme, userTheme)
}
