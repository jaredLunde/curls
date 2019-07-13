import useStyles from './useStyles'
import {objectWithoutProps} from './utils'


const withoutChildren = {children: 0}
export default options => props => props.children(
  objectWithoutProps(
    useStyles(props, options),
    withoutChildren
  )
)