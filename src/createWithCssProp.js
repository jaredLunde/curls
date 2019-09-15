import cloneElement from './cloneElement'
import {objectWithoutProps} from './utils'

const withoutChildren = {children: 0}
export default hook => props =>
  cloneElement(props.children, objectWithoutProps(hook(props), withoutChildren))
