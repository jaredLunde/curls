import memoize from 'lru-memoize-map'
import deepMerge from './deepMerge'

/**
let unCached = 0
function getTheme (defaultTheme = {}, userTheme) {
  unCached += 1
  console.log(`Uncached [${unCached}]:`, defaultTheme, userTheme)
  return deepMerge(defaultTheme, userTheme)
}
*/


const emptyObj = {}
const memoizer = memoize(4096, {multiArgs: true})(deepMerge)


export default function (defaultTheme = emptyObj, userTheme) {
  if (userTheme === void 0 || userTheme === null) {
    return defaultTheme
  }
  else if (typeof userTheme !== 'object'|| defaultTheme === emptyObj) {
    return userTheme
  }

  return memoizer(defaultTheme, userTheme)
}
