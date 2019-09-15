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
    return css`
      box-shadow: 0 0 ${dp / 16}rem rgba(67, 90, 111, 0.08),
        0 ${dp / 16}rem ${dp / 16}rem rgba(67, 90, 111, 0.13);
    `
  }
