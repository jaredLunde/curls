import {jsx} from '@emotion/core'


const withoutAs = props => {
  props = Object.assign({}, props)
  delete props.as
  return props
}

export default (defaultAs, props) =>
  props.as === void 0
    ? jsx(defaultAs, props)
    : jsx(props.as, withoutAs(props))