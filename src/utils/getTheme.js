import memoize from 'lru-memoize-map'
import deepMerge from './deepMerge'


function getTheme (defaultTheme = {}, userTheme) {
  if (userTheme === void 0 || userTheme === null) {
    return defaultTheme
  }

  return deepMerge(defaultTheme, userTheme)
}


export default memoize(1024, {multiArgs: true})(getTheme)
