import {css} from 'emotion'


export default function (dp, theme) {
  const rem = theme.rem || 16
  dp = parseInt(dp)

  if (dp === 0) {
    return
  }

  const ambientY = dp
  let ambientAlpha = (dp + 10 + (dp / 9.38)) / 100
  const ambientBlur = dp === 1 ? 3 : dp * 2
  let shadow = `${1 / rem}rem ${ambientY / rem}rem ${ambientBlur / rem}rem rgba(0, 0, 0, ${ambientAlpha})`
  const directY = dp < 10 ? Math.floor(dp / 2) + 1 : dp - 4
  const directBlur = dp === 1 ? 3 : dp * 2
  const directAlpha = (24 - Math.floor(dp / 20)) / 100
  shadow = `${shadow}, 0 ${directY / rem}rem ${directBlur}px rgba(0, 0, 0, ${ambientAlpha})`

  return css`
    box-shadow: ${shadow};
  `
}
