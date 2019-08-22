import {css} from '@emotion/core'
import {br as boxBr} from '../Box/styles'
import {memoTheme} from '../utils'
import {directionalRe} from '../utils/directionalScale'

const ws = /\s+/
export const br = memoTheme((val, theme) => {
  const vals = String(val).split(ws)
  let topRadius = 't0',
    bottomRadius = 'b0'

  for (let val of vals) {
    let abbr, value

    if (
      typeof val === 'number' ||
      (typeof val === 'string' && parseInt(val) > -1)
    ) {
      value = val
    } else {
      const av = String(val).split(directionalRe)
      abbr = av[0]
      value = av[1]
    }

    switch (abbr) {
      case 't':
        topRadius = topRadius + ` t${value}`
        break

      case 'b':
        bottomRadius = bottomRadius + ` b${value}`
        break

      case 'tl':
        topRadius = topRadius + ` tl${value}`
        break

      case 'tr':
        topRadius = topRadius + ` tr${value}`
        break

      case 'bl':
        bottomRadius = bottomRadius + ` bl${value}`
        break

      case 'br':
        bottomRadius = bottomRadius + ` br${value}`
        break

      case 'l':
        topRadius = topRadius + ` tl${value}`
        bottomRadius = bottomRadius + ` bl${value}`
        break

      case 'r':
        topRadius = topRadius + ` tr${value}`
        bottomRadius = bottomRadius + ` br${value}`
        break

      default:
        topRadius = `t${value}`
        bottomRadius = `b${value}`
    }
  }

  return css`
    ${boxBr(val, theme)}

    & > *:first-child {
      ${boxBr(topRadius, theme)};
      ${boxBr('b0', theme)};
    }

    & > *:last-child {
      ${boxBr(bottomRadius, theme)};
      ${boxBr('t0', theme)};
    }
  `
})
