import {getBreakPointOrder} from '../../utils'


export default (props, themeProps) => {
  const breakPointOrder = getBreakPointOrder(themeProps.theme.breakPoints)
  const nextProps = {}
  const propKeys = Object.keys(props)

  let foundBreakpoint = false, i

  for (i = 0; i < breakPointOrder.length; i++) {
    const bp = breakPointOrder[i]

    if (props[bp] !== void 0) {
      nextProps[bp] = props[bp]
      foundBreakpoint = true
    }
  }

  if (foundBreakpoint === false) {
    return props
  }

  for (i = 0; i < propKeys.length; i++) {
    const key = propKeys[i]
    nextProps[key] = props[key]
  }

  return nextProps
}
