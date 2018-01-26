const example = `
{
  avatar: {
    // Default props to apply to the component when rendered
    defaultProps: {
      sm: true,
      br: 5,
      bw: 1,
      bc: 'translucentLight'
    },

    // Default avatar sizes in px
    scale: {
      xxs: 20,
      xs: 36,
      sm: 72,
      md: 128,
      lg: 172,
      xl: 256,
      xxl: 360
    }
  }
}
`

const details = `
The scale values default to \`px\` values but you can use any value type you'd
like, such as \`rem\`.

See the [theming](/theming) page for more info about overriding defaults and
defining your own \`defaultProps\`.

Theme colors can be found on the [defaultColors](defaultColors) page.
`


export default {details, example}
