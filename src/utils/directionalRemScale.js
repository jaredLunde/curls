import {css} from 'emotion'


const directionalRe = /(?=\d+)/
const defaultDirections = {
  t: ['top'],
  r: ['right'],
  b: ['bottom'],
  l: ['left'],
  y: ['top', 'bottom'],
  x: ['right', 'left']
}


export default function directionalRemScale (
  prefix,
  modScale,
  modValue,
  directions = defaultDirections
) {
  let CSS = []

  for (let val of modValue.split(' ')) {
    let [abbr, value] = val.split(directionalRe)

    CSS = CSS.concat(
      directions[abbr].map(
        xyz => `${prefix.replace('{XYZ}', xyz)}: ${modScale[value]}rem;`
      )
    )
  }

  return css`${CSS.join(' ')}`
}
