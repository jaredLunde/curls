import {css} from '@emotion/core'
import {memoTheme, get} from '../utils'
import * as dT from './defaultTheme'


export const
  size = memoTheme((s, t) => {
    const value = get(t.button, 'scale', dT)[s]
    return typeof value === 'function' ? value(t) : value
  }),
  __buttonStyles = memoTheme((v, t, p) => [
    css`
      display: flex;
      align-items: center;
      justify-content: center;
      outline: 0;
      background: none;
      border: 0;
      color: inherit;
      cursor: pointer;
      font: inherit;
      overflow: visible;
      padding: 0;
      margin: 0;
      line-height: 1.0;
      user-select: none;
      text-align: inherit;
    
      &::-moz-focus-inner {
        border: 0;
        margin: 0;
        padding: 0;
      }
      
      &:focus {
        outline: 0
      }
    `,
    get(t.button, 'getHoverClass', dT)(t, p),
    get(t.button, 'getActiveClass', dT)(t, p)
  ])