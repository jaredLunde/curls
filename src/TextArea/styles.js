import {css} from '@emotion/core'
import {get, placeholder} from '../utils'
import * as dT from './defaultTheme'


export const autoResize = css`
  display: block !important;
  overflow: hidden !important;
  resize: none !important;
`

export const __textAreaStyles = (_, t, p) => [
  placeholder(get(t.textArea, 'getPlaceholderClass', dT)(t, p)),
  get(t.textArea, 'getHoverClass', dT)(t, p),
  get(t.textArea, 'getFocusClass', dT)(t, p)
]
