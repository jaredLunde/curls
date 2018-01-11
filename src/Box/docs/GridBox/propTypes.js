export default {
  // flex (display: flex)
  flex: {
    type: 'bool',
    description: '',
  },
  // flex--fixed (flex(0, 0, auto))
  fixed: {
    type: 'bool',
    description: '',
  },
  // flex--fluid (flex(1, 0, auto))
  fluid: {
    type: 'bool',
    description: '',
  },
  // flex--first
  first: {
    type: 'bool',
    description: '',
  },
  // flex--last
  last: {
    type: 'bool',
    description: '',
  },
  // flex--grow
  grow: {
    type: 'bool',
    description: '',
  },
  // flex--shrink
  shrink: {
    type: 'bool',
    description: '',
  },
  // flex--x
  row: {
    type: 'bool',
    description: '',
  },
  // flex--y
  column: {
    type: 'bool',
    description: '',
  },
  // flex--x-reverse (row-reverse)
  reverseX: {
    type: 'bool',
    description: '',
  },
  // flex--y-reverse (col-reverse)
  reverseY: {
    type: 'bool',
    description: '',
  },
  // flex--wrap
  wrap: {
    type: 'bool',
    description: '',
  },
  // flex--nowrap
  nowrap: {
    type: 'bool',
    description: '',
  },
  // flex--wrap-reverse
  wrapReverse: {
    type: 'bool',
    description: '',
  },
  // flex--x-{start|center|end|around|between}
  justify: {
    type: 'string',
    enum: ['start', 'center', 'end', 'around', 'between'],
    description: '',
  },
  // flex--y-{start|center|end|around|between|stretch}
  align: {
    type: 'string',
    enum: ['start', 'center', 'end', 'around', 'stretch', 'baseline'],
    description: '',
  },
  // flex--content-{start|center|end|around}
  alignContent: {
    type: 'string',
    enum: ['start', 'center', 'end', 'stretch', 'between', 'around'],
    description: '',
  },
  // flex--self-{start|center|end|around}
  alignSelf: {
    type: 'string',
    enum: ['start', 'center', 'end', 'stretch', 'baseline'],
    description: '',
  }
}
