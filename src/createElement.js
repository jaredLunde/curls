import {jsx} from '@emotion/core'
import {objectWithoutProps} from './utils'


const withoutAs = {as: 0}
export default (defaultAs, props, defaultCSS) => {
  if (defaultCSS !== void 0)
    props.css = props.css === void 0 ? defaultCSS :  [defaultCSS, props.css]
  return props.as === void 0
    ? jsx(defaultAs, props)
    : jsx(props.as, objectWithoutProps(props, withoutAs))
}