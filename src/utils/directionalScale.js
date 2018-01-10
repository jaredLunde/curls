import {css} from 'emotion'


export const directionalRe = /(?=\d+)/
const defaultDirections = {
  _: ['top', 'right', 'bottom', 'left'],
  t: ['top'],
  r: ['right'],
  b: ['bottom'],
  l: ['left'],
  y: ['top', 'bottom'],
  x: ['right', 'left']
}


export function isDirectional (value) {
  return typeof value === 'string' && value.length > 1
}


export default function directionalScale (
  prefix,
  modScale,
  modValue,
  theme,
  directions = defaultDirections
) {
  let CSS = []

  String(modValue).split(' ').forEach(
    function (val) {
      let [abbr, value] = val.split(directionalRe)
      if (!isNaN(parseInt(abbr))) {
        value = abbr
        abbr = '_'
      }

      directions[abbr].forEach(
        function (xyz) {
          CSS.push(`${prefix.replace('{XYZ}', xyz)}: ${modScale[value]}rem;`)
        }
      )
    }
  )

  return css`${CSS.join(' ')}`
}
