import memoize from '../utils/lru'
import deepMerge from './deepMerge'

/**
let uncached = 0
function getTheme (defaultTheme = {}, userTheme) {
  uncached += 1
  console.log('[Uncached]', uncached)
  return deepMerge(defaultTheme, userTheme)
}
*/

const emptyObj = {}
const memoizer = memoize(4096, {multiArgs: true})(deepMerge)


export default function (defaultTheme = emptyObj, userTheme) {
  if (userTheme === void 0 || userTheme === null) {
    return defaultTheme
  }
  else if (defaultTheme === emptyObj) {
    return userTheme
  }

  return memoizer(defaultTheme, userTheme)
}
