import propTypes from '../propTypes'
import {propTypes as flexPropTypes} from '../../../Flex/docs'


const props = {...propTypes, ...flexPropTypes}
delete props.nodeType

export default props
