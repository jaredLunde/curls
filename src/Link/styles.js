import {get} from '../utils'
import * as dT from './defaultTheme'

export const __linkStyles = (_, t, p) => [
  get(t.link, 'getHoverClass', dT)(t, p),
  get(t.link, 'getActiveClass', dT)(t, p),
]
