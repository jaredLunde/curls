import propTypes from './propTypes'
import * as CSS from './CSS'
import * as defaultTheme from './defaultTheme'
import createComponent from '../createComponent'
import {getBreakPointOrder} from '../utils'


export const plugins = [
  (props, themeProps) => {
    let found = false,
      nextProps = {__gridBreakPoints: {}},
      breakPointOrder = getBreakPointOrder(themeProps.theme.breakPoints),
      i = 0

    for (; i < breakPointOrder.length; i++) {
      const bp = breakPointOrder[i]

      if (props[bp] !== void 0) {
        nextProps.__gridBreakPoints[bp] = props[bp]
        found = true
      }
    }

    if (found === false) {
      return props
    }

    const propKeys = Object.keys(props)

    for (i = 0; i < propKeys.length; i++) {
      const key = propKeys[i]

      if (nextProps.__gridBreakPoints[key] === void 0) {
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
