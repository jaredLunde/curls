import {defaultColors} from '../theming'

export const rem = 16
export const spacingScale = [0, 1/4, 1/2, 1, 2, 4, 8, 16, 32]
export const borderWidthScale = [0, 1/16, 2/16, 4/16, 6/16, 10/16]
export const borderRadiusScale = [0, 1/4, 1/2, 1, 2, 1000]
export default {
  colors: defaultColors,
  rem,
  spacingScale,
  borderWidthScale,
  borderRadiusScale
}
