import {getBreakPointOrder} from '../../utils'


export default (props, themeProps) => {
  let found = false,
      nextProps = {__gridBreakPoints: {}},
      breakPointOrder = getBreakPointOrder(themeProps.theme.breakPoints),
      i

  for (i = 0; i < breakPointOrder.length; i++) {
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
