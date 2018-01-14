import {css} from 'emotion'


export default function (dp, theme) {
  dp = parseInt(dp)

  if (dp === 0) {
    return
  }

  const ambientY = dp
  let ambientAlpha = (dp + 10) / 100
  ambientAlpha = ambientAlpha > 0.24 ? 0.24 : ambientAlpha
  const ambientBlur = dp === 1 ? 3 : dp * 1.618
  let shadow = `1px ${ambientY}px ${ambientBlur}px rgba(0, 0, 0, ${ambientAlpha})`
  const directY = dp / 3
  const directBlur = dp === 1 ? 3 : dp * 1.618
  const directAlpha = (24 - (dp / 20)) / 100
  shadow = `${shadow}, 0 ${directY}px ${directBlur}px rgba(0, 0, 0, ${ambientAlpha})`

  return css`
    box-shadow: ${shadow};
  `
}
