import {propTypes as boxPropTypes_} from '../../Box/docs'


const boxPropTypes = {...boxPropTypes_}
delete boxPropTypes.children
boxPropTypes.h = {...boxPropTypes.h}
boxPropTypes.p = {...boxPropTypes.p}
boxPropTypes.sh = {...boxPropTypes.sh}
boxPropTypes.h.defaultValue = null
boxPropTypes.p.defaultValue = 3
boxPropTypes.sh.defaultValue = 4
delete boxPropTypes.nodeType


export default {
  children: {
    type: 'valid React children',
    example: 'Hello World'
  },
  nodeType: {
    type: 'React.Component|string',
    description: 'The type of React element created when rendered. The default value is `span`.'
  }, // will be overridden by Box props
  // Color
  color: {type: 'string', description: 'Adds a class for `color: @value`. The color defined here can be one of the colors listed in your theme (see [defaultColors](defaultColors) and [theming](/theming)) e.g. `#hex`, `rgb`, `rgba`, or `hsl`. First, this prop will search for a valid key in your theme colors. If a key is not found, it will use the exact `@value` instead.', defaultValue: 'grey'},
  // Typeface
  face: {type: 'string', description: 'Adds a class for `font-family: ${typeFaces[value] || value};` The family defined here can be one of the typeFaces listed in your theme (see [defaultTypeFaces](defaultTypeFaces) and [theming](/theming)). First, this prop will search for a valid key in your theme type faces. If a key is not found, it will use the exact `@value` instead. The default type face is the system defined type face - San Francisco on Apple products and Roboto on Android.'},
  // Sizes
  xxs: {type: 'bool', description: 'Adds a class for `font-size: ${scale.xxs};` This property is backed by a scale defined in the prop `scale` of the [default theme](#theme-example) below. The `@value` provided represents the key in the scale object.'},
  xs: {type: 'bool', description: 'Adds a class for `font-size: ${scale.xs};` This property is backed by a scale defined in the prop `scale` of the [default theme](#theme-example) below. The `@value` provided represents the key in the scale object.'},
  sm: {type: 'bool', description: 'Adds a class for `font-size: ${scale.sm};` This property is backed by a scale defined in the prop `scale` of the [default theme](#theme-example) below. The `@value` provided represents the key in the scale object.`'},
  md: {type: 'bool', description: 'Adds a class for `font-size: ${scale.md};` This property is backed by a scale defined in the prop `scale` of the [default theme](#theme-example) below. The `@value` provided represents the key in the scale object.'},
  lg: {type: 'bool', description: 'Adds a class for `font-size: ${scale.lg};` This property is backed by a scale defined in the prop `scale` of the [default theme](#theme-example) below. The `@value` provided represents the key in the scale object.`', defaultValue: true},
  xl: {type: 'bool', description: 'Adds a class for `font-size: ${scale.xl};` This property is backed by a scale defined in the prop `scale` of the [default theme](#theme-example) below. The `@value` provided represents the key in the scale object.`'},
  xxl: {type: 'bool', description: 'Adds a class for `font-size: ${scale.xxl};` This property is backed by a scale defined in the prop `scale` of the [default theme](#theme-example) below. The `@value` provided represents the key in the scale object.`'},
  // Weights
  thin: {type: 'bool', description:  'Adds a class for `font-weight: 100;`'},
  ultraLight: {type: 'bool', description: 'Adds a class for `font-weight: 200;`'},
  light: {type: 'bool', description: 'Adds a class for `font-weight: 300;`', defaultValue: true},
  regular: {type: 'bool', description: 'Adds a class for `font-weight: 400;`'},
  medium: {type: 'bool', description: 'Adds a class for `font-weight: 500;`'},
  semiBold: {type: 'bool', description: 'Adds a class for `font-weight: 600;`'},
  bold: {type: 'bool', description: 'Adds a class for `font-weight: 700;`'},
  heavy: {type: 'bool', description: 'Adds a class for `font-weight: 800;`'},
  ultraHeavy: {type: 'bool', description: 'Adds a class for `font-weight: 900;`'},
  // Alignment
  left: {type: 'bool', description: 'Adds a class for `text-align: left;`'},
  center: {type: 'bool', description: 'Adds a class for `text-align: center;`', defaultValue: true},
  right: {type: 'bool', description: 'Adds a class for `text-align: right;`'},
  ellipsis: {type: 'bool', description: `Adds a class for clipping text with an ellipsis when it exceeds its parent's width e.g. hello wor…
\`\`\`
max-width: 100%;
text-overflow: ellipsis;
white-space: nowrap;
overflow-x: hidden;
\`\`\`
`},
  // Legibility
  optimizeFor: {type: 'string', enumVals: ['legibility', 'speed'], description: 'Adds a class for `text-rendering: optimizeLegibility;` if `legibility` and `optimizeSpeed` for `speed`.'},
  antialias: {
    type: 'bool',
    description: `Adds a class for
\`\`\`
-moz-osx-font-smoothing: grayscale;
-webkit-font-smoothing: antialiased;
font-smoothing: antialiased;
\`\`\`
`,
    defaultValue: true
  },
  // Box
  ...boxPropTypes
}
