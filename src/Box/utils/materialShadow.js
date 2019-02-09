import {css} from '@emotion/core'


export default function (dp, theme) {
  if (dp === void 0 || dp === false || dp === null || dp == 0) {
    return css`box-shadow: none;`
  }

  dp = parseInt(dp)
  const ambientY = dp
  let ambientAlpha = (dp + 10) / 100
  ambientAlpha = Math.min(0.12, ambientAlpha)
  const ambientBlur = dp === 1 ? 3 : dp * 1.618
  let shadow = `0 ${ambientY}px ${ambientBlur}px rgba(0, 0, 0, ${ambientAlpha})`
  const directY = dp / 3
  const directBlur = dp === 1 ? 3 : dp * 1.618

  return css`
    box-shadow: ${shadow}, 0 ${directY}px ${directBlur}px rgba(0, 0, 0, ${ambientAlpha});
  `
}
