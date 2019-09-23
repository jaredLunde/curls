import {css} from '@emotion/core'

export const borderRadiusUnit = 'rem',
  borderWidthUnit = 'px',
  posUnit = 'px',
  borderWidthScale = [0, 1, 2, 4, 6, 10],
  borderRadiusScale = [0, 1 / 8, 1 / 4, 1 / 2, 1, 2, 1000],
  getBoxShadow = dp => {
    if (dp === void 0 || dp === false || dp === null || dp == 0) {
      return css`
        box-shadow: none;
      `
    }

    dp = parseInt(dp)
    const offset = dp / 16
    const blur = Math.abs(dp) / 16
    return css`
      box-shadow: 0 0 ${blur}rem rgba(67, 90, 111, 0.08),
        0 ${offset}rem ${blur}rem rgba(67, 90, 111, 0.13);
    `
  }
