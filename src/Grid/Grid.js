import propTypes from './propTypes'
import * as CSS from './CSS'
import * as defaultTheme from './defaultTheme'
import {createComponent} from '../utils'


export default createComponent({
  name: 'Grid',
  propTypes,
  CSS,
  defaultTheme,
  themePath: 'grid'
})
