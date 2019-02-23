import {fastMemoize} from '../utils'
import {getColumnWidth} from './utils'


const createBreakPointShortcut = fastMemoize('gridSize', s => (v, t, p) => getColumnWidth(s, v, t, p))
export const xxs = createBreakPointShortcut('xxs')
export const xs = createBreakPointShortcut('xs')
export const sm = createBreakPointShortcut('sm')
export const md = createBreakPointShortcut('md')
export const lg = createBreakPointShortcut('lg')
export const xl = createBreakPointShortcut('xl')
export const xxl = createBreakPointShortcut('xxl')
