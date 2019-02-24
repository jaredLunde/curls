import propTypes from './propTypes'
import * as CSS from './CSS'
import createComponent from '../createComponent'
import * as defaultTheme from './defaultTheme'


export default createComponent({name: 'Flex', propTypes, CSS, defaultTheme, themePath: 'flex'})
