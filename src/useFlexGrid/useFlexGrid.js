import * as styles from './styles'
import * as defaultTheme from './defaultTheme'
import {useTheme} from '../ThemeConsumer'
import {getBreakpointOrder} from '../utils'
import useStyles from '../useStyles'


const options = {name: 'flexGrid', styles, defaultTheme}
export default props => {
  let
    theme = useTheme(options.name),
    found = false,
    nextProps = Object.assign({}, {__gridBreakpoints: {}}),
    breakpointOrder = getBreakpointOrder(theme.breakpoints),
    i = 0

  for (; i < breakpointOrder.length; i++) {
    const bp = breakpointOrder[i]
    if (props[bp] !== void 0) {
      nextProps.__gridBreakpoints[bp] = props[bp]
      found = true
    }
  }

  if (found === false) return props

  const propKeys = Object.keys(props)
  for (i = 0; i < propKeys.length; i++) {
    const key = propKeys[i]
    if (nextProps.__gridBreakpoints[key] === void 0)
      nextProps[key] = props[key]
  }

  return useStyles(nextProps, options)
}
