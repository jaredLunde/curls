import {css} from '@emotion/core'
import {colorize, memoTheme, memoValue, unit, get} from '../utils'
import * as dT from './defaultTheme'


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
export const size = memoTheme((size, theme) => {
  if (size === false || size === null) return null

  let
    scale = get(theme.type, 'scale', dT),
    fontSize = scale[size],
    typeOfFontSize = typeof fontSize

  if (typeOfFontSize === 'function')
    fontSize = fontSize(theme)
  else if (typeOfFontSize !== 'object')
    fontSize = css`font-size: ${unit(size, get(theme.type, 'sizeUnit', dT))};`

  const isLeg = get(theme.type, 'legible', dT).indexOf(size) > -1
  return css`
      ${fontSize};
      ${optimizeFor[isLeg ? 'legibility' : 'speed']}; 
      ${isLeg && antialias};
    `
})
// Face
export const face = memoTheme((v, t) => css`font-family: ${get(t.type, 'faces', dT)[v] || v};`)
// Line height
export const lh = memoValue(v => css`line-height: ${v};`)
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
