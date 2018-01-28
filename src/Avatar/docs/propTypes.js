import {propTypes as basicBoxTypes_} from '../../Box/docs/BasicBox'
import {resetDocTypes} from '../../utils/docs'


const basicBoxTypes = resetDocTypes(basicBoxTypes_)
basicBoxTypes.m.defaultValue = 3
basicBoxTypes.br.defaultValue = 5
basicBoxTypes.bw.defaultValue = 1
basicBoxTypes.bc.defaultValue = 'translucentLight'
delete basicBoxTypes.children


export default {
  children: {
    type: 'function',
    description: `A function for rendering the \`<img>\` node. The default is:
\`\`\`
function ({src, defaultSrc, innerRef, alt}) {
  return <img
    src={src || defaultSrc}
    alt={alt}
    onError={e => e.target.src = defaultSrc || ''}
    ref={innerRef}
  />
}
\`\`\`
    `
  },
  nodeType: {
    type: 'React.Component|string',
    description: 'The type of React element created when rendered. The default value is `span`.'
  },
  defaultSrc: {
    type: 'string',
    description: 'The default image to show when `src` is undefined or null'
  },
  src: {
    type: 'string',
    description: 'The src of the underlying `<img>`.',
    defaultValue: 'https://rightorron.files.wordpress.com/2017/01/vincent-van-gogh-self-portrait-14.jpg'
  },
  xxs: {type: 'bool', description: 'Adds a class for `scale.xxs;` This property is backed by a scale defined in the prop `scale` of the [default theme](#theme-example) below. The `@value` provided represents the key in the scale object.'},
  xs: {type: 'bool', description: 'Adds a class for `scale.xs;` This property is backed by a scale defined in the prop `scale` of the [default theme](#theme-example) below. The `@value` provided represents the key in the scale object.'},
  sm: {type: 'bool', description: 'Adds a class for `scale.sm;` This property is backed by a scale defined in the prop `scale` of the [default theme](#theme-example) below. The `@value` provided represents the key in the scale object.`'},
  md: {type: 'bool', description: 'Adds a class for `scale.md;` This property is backed by a scale defined in the prop `scale` of the [default theme](#theme-example) below. The `@value` provided represents the key in the scale object.', defaultValue: true},
  lg: {type: 'bool', description: 'Adds a class for `scale.lg;` This property is backed by a scale defined in the prop `scale` of the [default theme](#theme-example) below. The `@value` provided represents the key in the scale object.`'},
  xl: {type: 'bool', description: 'Adds a class for `scale.xl;` This property is backed by a scale defined in the prop `scale` of the [default theme](#theme-example) below. The `@value` provided represents the key in the scale object.`'},
  xxl: {type: 'bool', description: 'Adds a class for `scale.xxl;` This property is backed by a scale defined in the prop `scale` of the [default theme](#theme-example) below. The `@value` provided represents the key in the scale object.`'},

  // GridBox
  ...basicBoxTypes
}
