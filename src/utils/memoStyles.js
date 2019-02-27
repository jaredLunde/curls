import memoize from 'trie-memoize'
import nullIfFalsey from './nullIfFalsey'


export const memoValue = fn => nullIfFalsey(memoize([Map], fn))
export const memoTheme = fn => nullIfFalsey(memoize([Map, WeakMap], fn))