import {propTypes as boxPropTypes_} from '../../Box/docs'


const boxPropTypes = {...boxPropTypes_}
delete boxPropTypes.children
boxPropTypes.h = {...boxPropTypes.h}
boxPropTypes.w = {...boxPropTypes.w}
boxPropTypes.p = {...boxPropTypes.p}
boxPropTypes.sh = {...boxPropTypes.sh}
boxPropTypes.br = {...boxPropTypes.br}
boxPropTypes.bg = {...boxPropTypes.bg}
boxPropTypes.bw = {...boxPropTypes.bw}
boxPropTypes.bc = {...boxPropTypes.bc}
delete boxPropTypes.h.defaultValue
delete boxPropTypes.w.defaultValue
delete boxPropTypes.p.defaultValue
delete boxPropTypes.sh.defaultValue
boxPropTypes.br.defaultValue = 5
boxPropTypes.bg.defaultValue = 'lightYellow'
delete boxPropTypes.bw.defaultValue
delete boxPropTypes.bc.defaultValue
delete boxPropTypes.nodeType


export default {
  children: {
    type: 'valid React children',
    example: 'Hello World'
  },
  nodeType: {
    type: 'React.Component|string',
    description: 'The type of React element created when rendered. The default value is `button`.'
  }, // will be overridden by Box props
  // Sizes
  xxs: {type: 'bool', description: 'Adds a class for `scale.xxs;` This property is backed by a scale defined in the prop `scale` of the [default theme](#theme-example) below. The `@value` provided represents the key in the scale object.'},
  xs: {type: 'bool', description: 'Adds a class for `scale.xs;` This property is backed by a scale defined in the prop `scale` of the [default theme](#theme-example) below. The `@value` provided represents the key in the scale object.'},
  sm: {type: 'bool', description: 'Adds a class for `scale.sm;` This property is backed by a scale defined in the prop `scale` of the [default theme](#theme-example) below. The `@value` provided represents the key in the scale object.`'},
  md: {type: 'bool', description: 'Adds a class for `scale.md;` This property is backed by a scale defined in the prop `scale` of the [default theme](#theme-example) below. The `@value` provided represents the key in the scale object.', defaultValue: true},
  lg: {type: 'bool', description: 'Adds a class for `scale.lg;` This property is backed by a scale defined in the prop `scale` of the [default theme](#theme-example) below. The `@value` provided represents the key in the scale object.`'},
  xl: {type: 'bool', description: 'Adds a class for `scale.xl;` This property is backed by a scale defined in the prop `scale` of the [default theme](#theme-example) below. The `@value` provided represents the key in the scale object.`'},
  xxl: {type: 'bool', description: 'Adds a class for `scale.xxl;` This property is backed by a scale defined in the prop `scale` of the [default theme](#theme-example) below. The `@value` provided represents the key in the scale object.`'},
  // Box
  ...boxPropTypes
}
