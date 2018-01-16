import * as defaultTheme from '../defaultTheme'


const breakpointOrder = Object.keys(defaultTheme.breakpoints)
breakpointOrder.reverse()


export default function (props) {
  const nextProps = {}
  const propKeys = Object.keys(props)

  let foundBreakpoint = false
  for (let x = 0; x < breakpointOrder.length; x++) {
    const bp = breakpointOrder[x]

    if (props[bp] !== void 0) {
      nextProps[bp] = props[bp]
      foundBreakpoint = true
    }
  }

  if (foundBreakpoint === false) {
    return props
  }

  for (let x = 0; x < propKeys.length; x++) {
    const key = propKeys[x]
    nextProps[key] = props[key]
  }

  return nextProps
}
