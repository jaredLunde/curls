import {css} from '@emotion/core'
import toSize from './toSize'


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

      const direction = directions[abbr]
      if (direction === void 0) {
        console.warn(`Direction '${abbr}' unrecognized in ${JSON.stringify(Object.keys(directions))}`)
        return
      }

      direction.forEach(
        function (xyz) {
          CSS.push(css`${prefix.replace('{XYZ}', xyz)}: ${toSize(modScale[value])};`)
        }
      )
    }
  )

  // return css`${CSS}`
  return CSS
}
