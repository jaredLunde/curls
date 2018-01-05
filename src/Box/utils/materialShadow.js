import {css} from 'emotion'


export default function (dp, reverse) {
  dp = parseInt(dp)
  const ambientY = dp
  const multiple = reverse === true ? -1 : 1
  let ambientAlpha = (dp + 10 + (dp / 9.38)) / 100
  const ambientBlur = dp === 1 ? 3 : dp * 2
  let shadow = `${1/16}rem ${(ambientY * multiple) / 16}rem ${ambientBlur / 16}rem rgba(0, 0, 0, ${ambientAlpha})`
  const directY = dp < 10 ? Math.floor(dp / 2) + 1 : dp - 4
  const directBlur = dp === 1 ? 3 : dp * 2
  const directAlpha = (24 - Math.floor(dp / 20)) / 100
  shadow = `${shadow}, 0 ${(directY * multiple) / 16}rem ${directBlur}px rgba(0, 0, 0, ${ambientAlpha})`

  return css`
    border-top: ${1/16}rem solid rgba(0, 0, 0, 0.04);
    box-shadow: ${shadow};
  `
}
