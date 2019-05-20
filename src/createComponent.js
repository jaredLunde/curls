import useStyles from './useStyles'
import {objectWithoutProps} from './utils'


const withoutChildren = {children: 0}
export default options => props => {
  const styleProps = useStyles(props, options)
  return props.children(objectWithoutProps(styleProps, withoutChildren))
}