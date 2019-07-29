import {forwardRef} from 'react'
import {createElement} from '@style-hooks/core'


export default (element, useStyles, css) => forwardRef((props, ref) => {
  if (css !== void 0) props = Object.assign({css}, props)
  props = useStyles(props)
  props.ref = ref
  return createElement(element, props)
})