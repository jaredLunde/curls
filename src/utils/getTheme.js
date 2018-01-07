import memoize from 'lru-memoize-map'
import deepMerge from './deepMerge'


let unCached = 0
function getTheme (defaultTheme = {}, userTheme) {
  unCached += 1
  console.log(`Uncached [${unCached}]:`, defaultTheme, userTheme)
  return deepMerge(defaultTheme, userTheme)
}


const emptyObj = {}
const memoizer = memoize(1024, {multiArgs: true})(getTheme)


export default function (defaultTheme = emptyObj, userTheme) {
  if (typeof userTheme !== 'object' && userTheme !== null) {
    return defaultTheme
  }

  return memoizer(defaultTheme, userTheme)
}
