import {css} from '@emotion/core'
import {optimizeFor, antialias} from '../CSS'

const legibleText = ['xl', 'xxl']

export default function fontSize (size, theme) {
  const isLg = legibleText.indexOf(size) > -1
  const textRendering = optimizeFor[isLg ? 'legibility' : 'speed']
  return css`
    font-size: ${theme.scale[size]}rem; ${textRendering}; ${isLg && antialias};
  `
}
