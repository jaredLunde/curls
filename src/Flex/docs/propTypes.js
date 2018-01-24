export default {
  children: {
    type: 'function',
    description: 'Children should expect an object containing a `className` property and any other properties not defined by this component that were passed to the component.'
  },
  // flex (display: flex)
  flex: {
    type: 'bool',
    description: 'Adds a class for `display: flex`'
  },
  // flex--fixed (flex(0, 0, auto))
  fixed: {
    type: 'bool',
    description: 'Adds a class for `flex: 0 0 auto`',
  },
  // flex--fluid (flex(1, 1, auto))
  fluid: {
    type: 'bool',
    description: 'Adds a class for `flex: 1 1 auto;`',
  },
  // flex--grow
  grow: {
    type: ['bool', 'number'],
    description: 'Adds a class for `flex-grow: @value // or 1 if true`',
  },
  // flex--shrink
  shrink: {
    type: ['bool', 'number'],
    description: 'Adds a class for `flex-shrink: @value // or 1 if true`',
  },
  // flex-basis
  basis: {
    type: ['string', 'number'],
    description: 'Adds a class for `flex-basis: @value`'
  },
  // order: _
  order: {
    type: 'number',
    description: 'Adds a class for `order: @value`',
  },
  // flex--x
  row: {
    type: ['bool', 'string'],
    enumVals: ['row', 'reverse'],
    description: 'Adds a class for `flex-direction: row` if `true` or `row`, and `row-reverse` if `reverse`',
  },
  // flex--y
  column: {
    type: ['bool', 'string'],
    enumVals: ['column', 'reverse'],
    description: 'Adds a class for `flex-direction: column` if `true` or `column`, and `column-reverse` if `reverse`',
  },
  // flex-wrap
  wrap: {
    type: ['bool', 'string'],
    enumVals: ['wrap', 'reverse', 'no'],
    description: 'Adds a class for `flex-wrap: wrap;` if `true` or `wrap`, a class for `nowrap` if `no` and `wrap-reverse` if `reverse`.',
  },
  // flex--x-{start|center|end|around|between}
  justify: {
    type: 'string',
    enumVals: ['start', 'center', 'end', 'around', 'between'],
    description: 'Adds a class for `justify-content: @value`',
  },
  // flex--y-{start|center|end|around|between|stretch}
  align: {
    type: 'string',
    enumVals: ['start', 'center', 'end', 'around', 'stretch', 'baseline'],
    description: 'Adds a class for `align-items: @value`',
  },
  // flex--content-{start|center|end|around}
  alignContent: {
    type: 'string',
    enumVals: ['start', 'center', 'end', 'stretch', 'between', 'around'],
    description: 'Adds a class for `align-content: @value`',
  },
  // flex--self-{start|center|end|around}
  alignSelf: {
    type: 'string',
    enumVals: ['start', 'center', 'end', 'stretch', 'baseline'],
    description: 'Adds a class for `align-self: @value`',
  }
}
