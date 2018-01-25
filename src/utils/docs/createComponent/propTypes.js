/*
name,
CSS,
propTypes,
defaultTheme,
themePath
*/
export default {
  name: {
    type: 'string',
    description: 'The name of the Component you are creating. This is primarily used for debugging.',
  },

  CSS: {
    type: 'object',
    description: '',
  },

  propTypes: {
    type: 'object',
    description: '',
  },

  defaultTheme: {
    type: 'object',
    description: '',
  },

  themePath: {
    type: 'string',
    description: 'The key within the global theme (in \`ThemeProvider\`) where `defaultTheme` resides and can be overwritten.',
  }
}
