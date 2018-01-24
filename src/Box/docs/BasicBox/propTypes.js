import {boxPropTypes} from '../propTypes'
import {propTypes as flexPropTypes} from '../../../Flex/docs'


const propTypes = {...boxPropTypes}
propTypes.children = flexPropTypes.children

export default propTypes
