import memoize from 'trie-memoize'
import nullIfFalse from './nullIfFalse'


export const memoValue = fn => nullIfFalse(memoize([Map], fn))
export const memoTheme = fn => nullIfFalse(memoize([Map, WeakMap], fn))