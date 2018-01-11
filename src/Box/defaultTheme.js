import {defaultColors, defaultRem} from '../theming'
import {materialShadow} from './utils'


export const spacingScale = [
  0,
  (1/4),
  (1/2),
  // (3/4),
  1,
  2,
  4,
  8,
  16,
  32
]
export const borderWidthScale = [
  0,
  1 / defaultRem,
  2 / defaultRem,
  4 / defaultRem,
  6 / defaultRem,
  10 / defaultRem
]
export const borderRadiusScale = [
  0,
  (1/4),
  (1/2),
  1,
  2,
  1000
]
export const getBoxShadow = materialShadow
export const colors = defaultColors
/**
export default {
  colors: defaultColors,
  spacingScale,
  borderWidthScale,
  borderRadiusScale,
  getBoxShadow
}
*/
