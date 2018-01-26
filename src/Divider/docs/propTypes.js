import {propTypes as basicBoxTypes_} from '../../Box/docs/BasicBox'
import {resetDocTypes} from '../../utils/docs'


const basicBoxTypes = resetDocTypes(basicBoxTypes_)
basicBoxTypes.m.defaultValue = 3
basicBoxTypes.bg.defaultValue = 'translucentLight'


export default {
  nodeType: {
    type: 'React.Component|string',
    description: 'The type of React element created when rendered. The default value is `div`.'
  },
  // GridBox
  ...basicBoxTypes
}
