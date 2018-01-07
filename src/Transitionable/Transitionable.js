import propTypes from './propTypes'
import * as CSS from './CSS'
import defaultTheme from './defaultTheme'
import {createSFC} from '../utils'


const themePath = 'transitionable'
export default createSFC({name: 'Transitionable', propTypes, CSS, defaultTheme, themePath})
