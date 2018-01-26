import {propTypes as gridBoxTypes_} from '../../Box/docs/GridBox'
import {resetDocTypes} from '../../utils/docs'


const gridBoxTypes = resetDocTypes(gridBoxTypes_)
gridBoxTypes.p.defaultValue = 3
gridBoxTypes.h.defaultValue = 200
gridBoxTypes.bg.defaultValue = 'white'
gridBoxTypes.sh.defaultValue = 2
gridBoxTypes.xxs.defaultValue = 2
gridBoxTypes.xs.defaultValue = 2
gridBoxTypes.sm.defaultValue = 2
gridBoxTypes.md.defaultValue = 4
gridBoxTypes.lg.defaultValue = 6
gridBoxTypes.xl.defaultValue = 8
gridBoxTypes.xxl.defaultValue = 8


export default {
  children: {
    type: 'valid React children',
    example: 'Hello World'
  },
  nodeType: {
    type: 'React.Component|string',
    description: 'The type of React element created when rendered. The default value is `div`.'
  }, 
  // GridBox
  ...gridBoxTypes
}
