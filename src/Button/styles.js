import {css} from '@emotion/core'
import {memoTheme, get} from '../utils'
import * as dT from './defaultTheme'


export const
  size = memoTheme((s, t) => {
    const value = get(t.button, 'scale', dT)[s]
    return typeof value === 'function' ? value(t) : value
  }),
  __buttonStyles = memoTheme((v, t, p) => [
    get(t.button, 'getHoverClass', dT)(t, p),
    get(t.button, 'getActiveClass', dT)(t, p)
  ])