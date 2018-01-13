import {getComponentTheme} from '../../utils'
import * as defaultTheme from '../defaultTheme'


const breakpointOrder = Object.keys(defaultTheme.breakpoints)
breakpointOrder.reverse()


export default function (props) {
  const theme = getComponentTheme(defaultTheme, props.theme, 'grid')
  const nextProps = {}

  for (let x = 0; x < breakpointOrder.length; x++) {
    const bp = breakpointOrder[x]

    if (props[bp] !== void 0) {
      nextProps[bp] = props[bp]
    }
  }

  const propKeys = Object.keys(props)
  for (let x = 0; x < propKeys.length; x++) {
    const key = propKeys[x]

    if (breakpointOrder.indexOf(key) === -1) {
      nextProps[key] = props[key]
    }
  }

  return nextProps
}
