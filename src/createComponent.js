import {forwardRef} from 'react'
import {createElement} from '@style-hooks/core'

export default (element, useStyles) =>
  forwardRef((props, ref) => {
    props = useStyles(props)
    props.ref = ref
    return createElement(element, props)
  })
