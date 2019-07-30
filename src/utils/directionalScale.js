import {css} from '@emotion/core'
import toUnit from './unit'


export const directionalRe = /(?=[\d]+|Auto)/
const defaultDirections = {
  _: ['top', 'right', 'bottom', 'left'],
  t: ['top'],
  r: ['right'],
  b: ['bottom'],
  l: ['left'],
  y: ['top', 'bottom'],
  x: ['right', 'left']
}

export const isDirectional = value => typeof value === 'string' && value.length > 1

export default (
  prefix,
  modScale,
  modValue,
  unit = 'px',
  directions = defaultDirections,
) => {
  let
    CSS = [],
    i = 0,
    j,
    modVals = String(modValue).split(' ')

  for (; i < modVals.length; i++) {
    const val = modVals[i]
    if (!val) return
    let [abbr, ...value] = val.split(directionalRe)
    value = value.join('')
    const isAbbrValue = isNaN(parseInt(abbr)) === false || abbr === 'auto'

    if (abbr.length === 0 || isAbbrValue === true) {
      value = isAbbrValue ? abbr : val
      abbr = '_'
    }

    const direction = directions[abbr]

    if (__DEV__)
      if (direction === void 0)
        throw (
          `Unrecognized direction '${abbr}' in ${prefix}: ${abbr}\n\n`
          + `Allowed values include: ${Object.keys(directions).join(', ')}`
        )

    let size = modScale[value]
    if (size === void 0) {
      if (value === 'Auto')
        size = 'auto'
      else {
        if (__DEV__)
          throw (
            `Unrecognized scale value in ${prefix}: ${value}\n\n`
            + `Allowed values include: ${Object.keys(modScale).join(', ')}`
          )
      }
    }

    for (j = 0; j < direction.length; j++)
      CSS.push(css`${prefix.replace('{XYZ}', direction[j])}: ${toUnit(size, unit)};`)
  }

  return CSS.length === 1 ? CSS[0] : CSS
}
