import {css} from '@emotion/core'

export const borderRadiusUnit = 'rem',
  borderWidthUnit = 'px',
  posUnit = 'px',
  borderWidthScale = [0, 1, 2, 4, 6, 10],
  borderRadiusScale = [0, 1 / 8, 1 / 4, 1 / 2, 1, 2, 1000],
  getBoxShadow = dp => {
    if (dp === void 0 || dp === false || dp === null || dp == 0)
      return css`
        box-shadow: none;
      `

    dp = parseInt(dp)
    const ambientY = dp / 16
    let ambientAlpha = (dp + 10) / 100
    ambientAlpha = Math.min(0.12, ambientAlpha)
    const ambientBlur = (dp === 1 ? 3 : dp * 1.618) / 16
    let shadow = `0 ${ambientY}rem ${ambientBlur}rem rgba(0, 0, 0, ${ambientAlpha})`
    const directY = dp / 3 / 16
    const directBlur = (dp === 1 ? 3 : dp * 1.618) / 16

    return css`
      box-shadow: ${shadow},
        0 ${directY}rem ${directBlur}rem rgba(0, 0, 0, ${ambientAlpha});
    `
  }
