import propTypes from './propTypes'
import * as CSS from './CSS'
import defaultTheme from './defaultTheme'
import {createFactory} from '../utils'


export default createFactory({
  name: 'Grid',
  propTypes,
  CSS,
  defaultTheme,
  themePath: 'grid'
})
