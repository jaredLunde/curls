import propTypes from './propTypes'
import * as CSS from './CSS'
import * as defaultTheme from './defaultTheme'
import createComponent from '../createComponent'
import {orderBreakPoints} from './utils'


export const plugins = [orderBreakPoints]
export default createComponent({
  name: 'Grid',
  propTypes,
  CSS,
  defaultTheme,
  themePath: 'grid',
  plugins
})
