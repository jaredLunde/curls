import {css} from '@emotion/core'
import {optimizeFor, antialias} from '../CSS'


export default function fontSize (size, theme, props) {
  if (size === false) {
    return null
  }

  const isLeg = theme.legible.indexOf(size) > -1
  const textRendering = optimizeFor[isLeg ? 'legibility' : 'speed']
  let fontSize = theme.scale[size]
  const typeOfFontSize = typeof fontSize

  if (typeOfFontSize === 'function') {
    fontSize = fontSize(theme, props)
  }
  else if (typeOfFontSize !== 'object') {
    fontSize = css`font-size: ${fontSize}rem;`
  }

  return css`
    ${fontSize};
    ${textRendering}; 
    ${isLeg && antialias};
  `
}
