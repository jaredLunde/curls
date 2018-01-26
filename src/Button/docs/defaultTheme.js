const example = `
{
  type: {
    // The default props added to the Component on its render
    defaultProps: {
      br: 5,
      bw: 1,
      bg: 'white',
      md: true,
      role: 'button'
    },

    // The sizing scale can be any css you choose
    scale: {
      xxs: css\`padding: 6px 12px;\`,
      xs: css\`padding: 8px 16px;\`,
      sm: css\`padding: 12px 24px;\`,
      md: css\`padding: 16px 32px;\`,
      lg: css\`padding: 20px 40px;\`,
      xl: css\`padding: 24px 48px;\`,
      xxl: css\`padding: 30px 60px;\`,
    },

    // This function defines the hover class CSS given the components' props
    // and theme. Returning undefined means no class gets added.
    getHoverClass: function (props, theme) {
      // adds css classes for hover and active states
      const hoverStyle = css\`
        &:hover {
          opacity: 0.8;
        }
      \`

      const noneStyle = css\`
        &:hover {
          opacity: 1.0;
        }
      \`

      return css\`\${withHoverQuery(hoverStyle, noneStyle)}\`
    }
  },

  // This function defines the active class CSS given the components' props
  // and theme. Returning undefined means no class gets added.
  getActiveClass: function (props, theme) {
    return css\`
      &:active {
        background-color: \${darken(0.05, theme.colors[props.bg])};
      }
    \`
  }
}
`


const details = `
The size scale can be any css you choose.

See the [theming](/theming) page for more info about overriding defaults and
defining your own \`defaultProps\`.

Theme colors can be found on the [defaultColors](defaultColors) page.
`


export default {details, example}
