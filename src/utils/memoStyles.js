import memoize from 'trie-memoize'
import nullIfFalsy from './nullIfFalsy'


export const memoValue = fn => nullIfFalsy(memoize([Map], fn))
export const memoTheme = fn => nullIfFalsy(memoize([Map, WeakMap], fn))