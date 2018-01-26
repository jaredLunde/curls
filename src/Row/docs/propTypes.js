import {propTypes as flexBoxTypes_} from '../../Box/docs/FlexBox'
import {resetDocTypes} from '../../utils/docs'


const flexBoxTypes = resetDocTypes(flexBoxTypes_)


export default {
  children: {
    type: 'valid React children',
    example: 'Hello World'
  },
  nodeType: {
    type: 'React.Component|string',
    description: 'The type of React element created when rendered. The default value is `div`.'
  }, // will be overridden by Box props
  // FlexBox
  ...flexBoxTypes
}
