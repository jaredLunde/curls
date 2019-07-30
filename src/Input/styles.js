import {get, placeholder} from '../utils'
import * as dT from './defaultTheme'


export const __inputStyles = (_, t, p) => [
    placeholder(get(t.input, 'getPlaceholderClass', dT)(t, p)),
    get(t.input, 'getHoverClass', dT)(t, p),
    get(t.input, 'getFocusClass', dT)(t, p)
 ]
