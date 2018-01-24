// import {defaultColors} from '../theming'
import {materialShadow} from './utils'


export const spacingScale = [
  0,
  (1/4) * 16,
  (1/2) * 16,
  16,
  2 * 16,
  4 * 16,
  8 * 16,
  16 * 16,
  32 * 16
]
export const borderWidthScale = [
  0,
  1,
  2,
  4,
  6,
  10
]
export const borderRadiusScale = [
  0,
  (1/4) * 16,
  (1/2) * 16,
  16,
  2 * 16,
  1000 * 16
]
export const getBoxShadow = materialShadow
