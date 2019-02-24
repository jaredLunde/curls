import propTypes from './propTypes'
import * as CSS from './CSS'
import * as defaultTheme from './defaultTheme'
import createComponent from '../createComponent'
import {getBreakpointOrder} from '../utils'


export const plugins = [
  (props, themeProps) => {
    let found = false,
      nextProps = {__gridBreakpoints: {}},
      breakpointOrder = getBreakpointOrder(themeProps.theme.breakpoints),
      i = 0

    for (; i < breakpointOrder.length; i++) {
      const bp = breakpointOrder[i]

      if (props[bp] !== void 0) {
        nextProps.__gridBreakpoints[bp] = props[bp]
        found = true
      }
    }

    if (found === false) {
      return props
    }

    const propKeys = Object.keys(props)

    for (i = 0; i < propKeys.length; i++) {
      const key = propKeys[i]

      if (nextProps.__gridBreakpoints[key] === void 0) {
        nextProps[key] = props[key]
      }
    }

    return nextProps
  }
]

export default createComponent({
  name: 'Grid',
  propTypes,
  CSS,
  defaultTheme,
  themePath: 'grid',
  plugins
})
