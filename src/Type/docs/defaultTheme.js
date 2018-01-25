const example = `
{
  type: {
    // The default props added to the Component on its render
    defaultProps: {
      sm: true,
      color: 'darkerGrey',
    },

    // The sizing scale is defined in rem
    scale: {
      xxs: 0.625,
      xs: 0.8125,
      sm: 1,
      md: 1.1875,
      lg: 1.5,
      xl: 2.25,
      xxl: 3
    }
  }
}
`


const details = `
The size scale *must* be defined in rem.

See the [theming](/theming) page for more info about overriding defaults.

Theme colors can be found on the [defaultColors](defaultColors) page.
`


export default {details, example}
