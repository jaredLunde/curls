import {fastMemoize} from '../utils'
import {getColumnWidth} from './utils'


const createBreakPointShortcut = fastMemoize('gridSize', s => (v, t, p) => getColumnWidth(s, v, t, p))

export const __gridBreakPoints = (v, t, p) => {
  const css = []

  for (let size in v) {
    css.push(createBreakPointShortcut(size)(v[size], t, p))
  }

  return css
}