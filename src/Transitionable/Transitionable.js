import propTypes from './propTypes'
import * as CSS from './CSS'
import * as defaultTheme from './defaultTheme'
import createComponent from '../createComponent'


const themePath = 'transitionable'
export default createComponent({name: 'Transitionable', propTypes, CSS, defaultTheme, themePath})
