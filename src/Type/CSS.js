import {css} from '@emotion/core'
import {fastMemoize, colorize, nullIfFalse} from '../utils'
import {fontSize} from './utils'


// Weights
export const thin = css`font-weight: 100;`
export const ultraLight = css`font-weight: 200;`
export const light = css`font-weight: 300;`
export const regular = css`font-weight: 400;`
export const medium = css`font-weight: 500;`
export const semiBold = css`font-weight: 600;`
export const bold = css`font-weight: 700;`
export const heavy = css`font-weight: 800;`
export const ultraHeavy = css`font-weight: 900;`
// Sizes
const createSizeShortcut = fastMemoize('typeSize', s => (v, t, p) => fontSize(s, t, p))
export const xxs = createSizeShortcut('xxs')
export const xs = createSizeShortcut('xs')
export const sm = createSizeShortcut('sm')
export const md = createSizeShortcut('md')
export const lg = createSizeShortcut('lg')
export const xl = createSizeShortcut('xl')
export const xxl = createSizeShortcut('xxl')
export const size = (s, t, p) => createSizeShortcut(s)(true, t, p)
// Face
export const face = nullIfFalse((v, t) => css`font-family: ${t.typeFaces[v] || v};`)
// Color
export const color = (v, t) => colorize('color', v, t) // colorize implements nullIfFalse
// Alignment
export const left = css`text-align: left;`
export const center = css`text-align: center;`
export const right = css`text-align: right;`
export const justified = css`text-align: justify;`
// Legibility
export const optimizeFor = {
  speed: css`text-rendering: optimizeLegibility;`,
  legibility: css`text-rendering: optimizeLegibility;`
}
export const antialias = css`
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-smoothing: antialiased;
`
// Other
export const ellipsis = css`
  max-width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow-x: hidden;
`
