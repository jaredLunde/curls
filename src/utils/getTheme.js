import memoize from 'trie-memoize'
import emptyObj from 'empty/object'
import deepMerge from './deepMerge'


const merge = memoize([WeakMap, WeakMap], deepMerge)

export default (defaultTheme = emptyObj, userTheme) => {
  if (userTheme === void 0)
    return defaultTheme
  else if (defaultTheme === emptyObj)
    return userTheme
  return merge(defaultTheme, userTheme)
}
