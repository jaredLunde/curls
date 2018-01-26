import propTypes from '../propTypes'
import {propTypes as flexPropTypes} from '../../../Flex/docs'
import {propTypes as gridPropTypes} from '../../../Grid/docs'


const props = {...gridPropTypes,...propTypes,...flexPropTypes}
delete props.nodeType

export default props
