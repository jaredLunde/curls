import propTypes from './propTypes'
import * as CSS from './CSS'
import defaultTheme from './defaultTheme'
import {createFactory} from '../utils'


const themePath = 'transitionable'
export default createFactory({name: 'Transitionable', propTypes, CSS, defaultTheme, themePath})
