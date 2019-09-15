import {css} from '@emotion/core'
import {colorize, memoTheme, memoValue, unit, get} from '../utils'
import * as dT from './defaultTheme'

export const weight = {
  '100': css`
    font-weight: 100;
  `,
  '200': css`
    font-weight: 200;
  `,
  '300': css`
    font-weight: 300;
  `,
  '400': css`
    font-weight: 400;
  `,
  '500': css`
    font-weight: 500;
  `,
  '600': css`
    font-weight: 600;
  `,
  '700': css`
    font-weight: 700;
  `,
  '800': css`
    font-weight: 800;
  `,
  '900': css`
    font-weight: 900;
  `,
}

export const size = memoTheme((size, theme) => {
  let scale = get(theme.text, 'scale', dT),
    fontSize = scale[size],
    typeOfFontSize = typeof fontSize

  if (typeOfFontSize === 'function') fontSize = fontSize(theme)
  else if (typeOfFontSize !== 'object')
    fontSize = css`
      font-size: ${unit(fontSize, get(theme.text, 'sizeUnit', dT))};
    `

  const isLeg = get(theme.text, 'legible', dT).indexOf(size) > -1
  return css`
    ${fontSize};
    ${optimizeFor[isLeg ? 'legibility' : 'speed']};
    ${isLeg && antialias};
  `
})

export const family = memoTheme(
  (v, t) =>
    css`
      font-family: ${get(t.text, 'families', dT)[v] || v};
    `
)

export const lineHeight = memoValue(
  v =>
    css`
      line-height: ${v};
    `
)

export const color = (v, t) => colorize('color', v, t) // colorize implements nullIfFalse

export const aligned = {
  left: css`
    text-align: left;
  `,
  center: css`
    text-align: center;
  `,
  right: css`
    text-align: right;
  `,
  justified: css`
    text-align: justify;
  `,
  inherit: css`
    text-align: inherit;
  `,
}

export const optimizeFor = {
    speed: css`
      text-rendering: speed;
    `,
    legibility: css`
      text-rendering: optimizeLegibility;
    `,
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
