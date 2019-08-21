import {objectWithoutProps} from './utils'

const withoutChildren = {children: 0}
export default hook => props =>
  props.children(objectWithoutProps(hook(props), withoutChildren))
