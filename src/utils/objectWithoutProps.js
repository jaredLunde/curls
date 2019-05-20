import memoize from 'trie-memoize'


export const
  objectWithoutProps = (obj, props) => {
    let next = {}, keys = Object.keys(obj), i = 0
    for (; i < keys.length; i++) if (props[keys[i]] === void 0) next[keys[i]] = obj[keys[i]]
    return next
  },
  objectWithoutPropsMemo = memoize([WeakMap, WeakMap], objectWithoutProps)