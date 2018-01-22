import propTypes from './propTypes'
import * as CSS from './CSS'
import * as defaultTheme from './defaultTheme'
import createComponent from '../createComponent'
import {reorderBreakpoints} from './utils'


const SFC = createComponent({
  name: 'Grid',
  propTypes,
  CSS,
  defaultTheme,
  themePath: 'grid'
})


export default function (props) {
  return SFC(reorderBreakpoints(props))
}
