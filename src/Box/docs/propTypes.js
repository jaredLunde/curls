import {propTypes as flexPropTypes_} from '../../Flex/docs'

const flexPropTypes = {...flexPropTypes_}
delete flexPropTypes.children

export const boxPropTypes = {
  children: {
    type: 'valid React children'
  },
  nodeType: {
    type: 'React.Component|string',
    description: 'The type of React element created when rendered. The default value is `div`.'
  },
  w: {
    defaultValue: 240,
    type: 'string|number',
    description: 'Provides an emotion class for `width: @value`. If `@value` is a number, it will be defined as `px`.',
  },
  h: {
    defaultValue: 324,
    type: 'string|number',
    description: 'Provides an emotion class for `height: @value`. If `@value` is a number, it will be defined as `px`.',
  },
  bg: {
    defaultValue: 'white',
    type: 'string',
    description: 'Provides emotion class for `background: @value`. The color defined here can be one of the colors listed in your theme (see [defaultColors](defaultColors) and [theming](/theming)) or a valid background e.g. `#hex`, `rgb`, `rgba`, `url`, or `hsl`. First, this prop will search for a valid key in your theme colors. If a key is not found, it will use the exact `@value` instead.',
  },
  br: {
    defaultValue: 2,
    type: 'string|number',
    description: `
Provides emotion class for \`border-radius: scale[@value]\`. This property
is backed by a scale defined in the prop \`borderRadiuScale\` of the [default theme](#theme-example)
below. The \`@value\` provided represents the index in the scale array.

If \`@value\` is an \`integer\` the scale will be applied to all corners
of the box. Otherwise, this property uses a directional scale which is as
follows \`[position][scale]\`:

- \`t\`: top-right + top-left, \`br='t1'\`
- \`r\`: top-right + bottom-right, \`br='r3'\`
- \`b\`: bottom-right + bottom-left, \`br='b4'\`
- \`l\`: top-left + bottom-left, \`br='l2'\`
- \`tl\`: top-left, \`br='tl1'\`
- \`tr\`: top-right, \`br='tr4'\`
- \`bl\`: bottom-left, \`br='bl2'\`
- \`br\`: bottom-right, \`br='br3'\`

Finally, you can use multiple values with this prop. For example \`br='2 br1'\`
creates a class for \`border-radius: scale[2];\` and \`border-bottom-right-radius: scale[1];\`.
The order of your definitions absolutely matters as styles are applied in order.
`,
  },
  bw: {
    defaultValue: '1 b0',
    type: 'string|number',
    description:  `
Provides emotion class for \`border-width: scale[@value]\`. This property
is backed by a scale defined in the prop \`borderWidthScale\` of the [default theme](#theme-example)
below. The \`@value\` provided represents the index in the scale array.

If \`@value\` is an \`integer\` the scale will be applied to all sides
of the box. Otherwise, this property uses a directional scale which is as
follows \`[position][scale]\`:

- \`t\`: top, \`bw='t1'\`
- \`r\`: right, \`bw='r4'\`
- \`b\`: bottom, \`bw='b2'\`
- \`l\`: left, \`bw='l3'\`
- \`y\`: top + bottom, \`bw='y1'\`
- \`x\`: right + left, \`bw='x4'\`

Finally, you can use multiple values with this prop. For example \`bw='2 l1'\`
creates a class for \`border-width: scale[2];\` and \`border-left-width: scale[1];\`.
The order of your definitions absolutely matters as styles are applied in order.
`
  },
  bc: {
    defaultValue: 'translucentLight',
    type: 'string',
    description: 'Provides emotion class for `border-color: @value`. The color defined here can be one of the colors listed in your theme (see [defaultColors](defaultColors) and [theming](/theming)) or a valid color e.g. `#hex`, `rgb`, `rgba`, or `hsl`. First, this prop will search for a valid key in your theme colors. If a key is not found, it will use the exact `@value` instead.',
  },
  sh: {
    defaultValue: 16,
    type: 'number',
    description: `Provides emotion class for \`box-shadow: theme.getBoxShadow(@value)\`. This property
    is backed by a \`getBoxShadow(@value)\` function defined in the [default theme](#theme-example)
    below.`
  },
  m: {
    defaultValue: 5,
    type: 'string|number',
    description: `
Provides emotion class for \`margin: scale[@value]\`. This property
is backed by a scale defined in the \`spacingScale\` prop of the [default theme](#theme-example)
below. The \`@value\` provided represents the index in the scale array.

If \`@value\` is an \`integer\` the scale will be applied to all sides
of the box. Otherwise, this property uses a directional scale which is as
follows \`[position][scale]\`:

- \`t\`: top, \`m='t1'\`
- \`r\`: right, \`m='r4'\`
- \`b\`: bottom, m='b2'\`
- \`l\`: left, \`m='l3'\`
- \`y\`: top + bottom, \`m='y1'\`
- \`x\`: right + left, \`m='x4'\`

Finally, you can use multiple values with this prop. For example \`m='2 l1'\`
creates a class for \`margin: scale[2];\` and \`margin-left: scale[1];\`.
The order of your definitions absolutely matters as styles are applied in order.
`
  },
  p: {
    type: 'string|number',
    description: `
Provides emotion class for \`margin: scale[@value]\`. This property
is backed by a scale defined in the \`spacingScale\` prop of the [default theme](#theme-example)
below. The \`@value\` provided represents the index in the scale array.

If \`@value\` is an \`integer\` the scale will be applied to all sides
of the box. Otherwise, this property uses a directional scale which is as
follows \`[position][scale]\`:

- \`t\`: top, \`p='t1'\`
- \`r\`: right, \`p='r4'\`
- \`b\`: bottom, p='b2'\`
- \`l\`: left, \`p='l3'\`
- \`y\`: top + bottom, \`p='y1'\`
- \`x\`: right + left, \`p='x4'\`

Finally, you can use multiple values with this prop. For example \`p='2 l1'\`
creates a class for \`padding: scale[2];\` and \`padding-left: scale[1];\`.
The order of your definitions absolutely matters as styles are applied in order.
`
  },
  z: {
    type: 'number',
    description: 'Provides emotion class for `z-index: @value`.',
  },
  pos: {
    type: 'string',
    enumVals: ['relative', 'absolute', 'fixed', 'sticky', 'static'],
    description: 'Provides emotion class for `position: @value`.',
  },
  d: {
    type: 'string',
    enumVals: ['block', 'inlineBlock', 'inline', 'none'],
    description: 'Provides emotion class for `display: @value`.',
  },
  ov: {
    type: 'string',
    enumVals: ['auto', 'autoX', 'autoY', 'hidden', 'hiddenX', 'hiddenY', 'scroll', 'scrollX', 'scrollY', 'touch'],
    description: `Provides emotion class for \`overflow: @value\`. Multiple
values may be provided, for instance \`ov="autoY hiddenX"\` would set styles
for \`overflow-y: auto;\` and \`overflow-x: hidden;\`.

- \`auto\`: \`overflow: auto;\`,
- \`autoX\`: \`overflow-x: auto;\`,
- \`autoY\`: \`overflow-y: auto;\`,
- \`hidden\`: \`overflow: hidden;\`,
- \`hiddenX\`: \`overflow-x: hidden;\`,
- \`hiddenY\`: \`overflow-y: hidden;\`,
- \`scroll\`: \`overflow: scroll;\`,
- \`scrollX\`: \`overflow-x: scroll;\`,
- \`scrollY\`: \`overflow-y: scroll;\`,
- \`touch\`: \`-webkit-overflow-scrolling: touch;\`
`
  },
}


export default {...boxPropTypes, ...flexPropTypes}
