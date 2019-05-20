import {jsx} from '@emotion/core'
import {objectWithoutProps} from './utils'


const withoutAs = {as: 0}
export default (defaultAs, nodeProps, defaultCSS) => {
  if (defaultCSS !== void 0)
    nodeProps.css = nodeProps.css === void 0 ? defaultCSS :  [defaultCSS, nodeProps.css]
  return nodeProps.as === void 0
    ? jsx(defaultAs, nodeProps)
    : jsx(nodeProps.as, objectWithoutProps(nodeProps, withoutAs))
}