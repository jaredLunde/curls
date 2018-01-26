const example = `
{
  input: {
    // default props added to the Component on its render
    defaultProps: {
      bg: 'white',
      m: 0,
      p: 2,
      bc: 'translucentLight',
      bw: 1,
      br: 5,
      color: 'darkGrey',
      light: true,
      sm: true
    },

    // defines the '::placeholder' styles
    getPlaceholderClass: function (props, theme) {
      return css\`
        opacity: 0.8;
        \${colorize('color', props.color, theme)};
      \`
    },

    // defines the styles for hover selectors
    getHoverClass: function (props, theme) {
      return
    },

    // defines the styles for focus selectors
    getFocusClass: function (props, theme) {
      return
    }
  }
}
`


const details = `
See the [theming](/theming) page for more info about overriding defaults and
defining your own \`defaultProps\`.

Theme colors can be found on the [defaultColors](defaultColors) page.
`


export default {details, example}
