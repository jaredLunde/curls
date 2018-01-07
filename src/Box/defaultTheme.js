import {defaultColors, defaultRem} from '../theming'
import {materialShadow} from './utils'


export const rem = defaultRem
export const spacingScale = [
  0,
  (1/4) * rem,
  (1/2) * rem,
  1 * rem,
  2 * rem,
  4 * rem,
  8 * rem,
  16 * rem,
  32 * rem
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
  (1/4) * rem,
  (1/2) * rem,
  1 * rem,
  2 * rem,
  1000 * rem
]
export const getBoxShadow = materialShadow

export default {
  colors: defaultColors,
  rem,
  spacingScale,
  borderWidthScale,
  borderRadiusScale,
  getBoxShadow
}
