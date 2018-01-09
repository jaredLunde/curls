import propTypes from './propTypes'
import * as CSS from './CSS'
import defaultTheme from './defaultTheme'
import {createComponent} from '../utils'


export default createComponent({
  name: 'Grid',
  propTypes,
  CSS,
  defaultTheme,
  themePath: 'grid'
})
