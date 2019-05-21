import {css} from '@emotion/core'
import memoize from 'trie-memoize'
import {fastMemoize, colorize, memoTheme, toSize} from '../utils'


const fontSizeFromTheme = memoize(
  [Map, WeakMap],
  (v, t) => {
    const isLeg = t.legible && t.legible.indexOf(v) > -1
    return css`
      font-size: ${toSize(v, t.sizeUnit)};
      ${optimizeFor[isLeg ? 'legibility' : 'speed']}; 
      ${isLeg && antialias};
    `
  }
)

const fontSize = (size, theme, props) => {
  if (size === false || size === null) {
    return null
  }

  let fontSize = theme.scale[size]
  const typeOfFontSize = typeof fontSize

  if (typeOfFontSize === 'function') {
    const isLeg = theme.legible.indexOf(size) > -1
    return css`
      ${fontSize(theme, props)};
      ${optimizeFor[isLeg ? 'legibility' : 'speed']}; 
      ${isLeg && antialias};
    `
  }
  else if (typeOfFontSize !== 'object') {
    return fontSizeFromTheme(fontSize, theme)
  }
  else {
    const isLeg = theme.legible.indexOf(size) > -1
    return css`
      ${fontSize};
      ${optimizeFor[isLeg ? 'legibility' : 'speed']}; 
      ${isLeg && antialias};
    `
  }
}

// Weights
export const
  thin = css`font-weight: 100;`,
  ultraLight = css`font-weight: 200;`,
  light = css`font-weight: 300;`,
  regular = css`font-weight: 400;`,
  medium = css`font-weight: 500;`,
  semiBold = css`font-weight: 600;`,
  bold = css`font-weight: 700;`,
  heavy = css`font-weight: 800;`,
  ultraHeavy = css`font-weight: 900;`
// Sizes
const createSizeShortcut = fastMemoize('typeSize', s => (v, t, p) => fontSize(s, t, p))
export const size = (s, t, p) => createSizeShortcut(s)(true, t, p)
// Face
export const face = memoTheme((v, t) => css`font-family: ${t.faces[v] || v};`)
// Color
export const color = (v, t) => colorize('color', v, t) // colorize implements nullIfFalse
// Alignment
export const
  left = css`text-align: left;`,
  center = css`text-align: center;`,
  right = css`text-align: right;`,
  justified = css`text-align: justify;`
// Legibility
export const
  optimizeFor = {
    speed: css`text-rendering: optimizeLegibility;`,
    legibility: css`text-rendering: optimizeLegibility;`
  },
  antialias = css`
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-smoothing: antialiased;
  `,
  ellipsis = css`
    max-width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow-x: hidden;
  `
