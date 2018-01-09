import propTypes from './propTypes'
import * as CSS from './CSS'
import defaultTheme from './defaultTheme'
import {createComponent} from '../utils'


const themePath = 'transitionable'
export default createComponent({name: 'Transitionable', propTypes, CSS, defaultTheme, themePath})
