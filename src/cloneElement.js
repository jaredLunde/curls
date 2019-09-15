import {jsx} from '@emotion/core'

export default (element, props) =>
  jsx(
    element.type,
    Object.assign(
      {
        key: element.key,
        ref: element.ref,
      },
      element.props,
      {},
      props
    )
  )
