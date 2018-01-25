const example = `
{
  grid: {
    breakpoints: {
      xxs: 'only screen and (max-width: 240px)',
      xs: 'only screen and (max-width: 324px)',
      sm: 'only screen and (max-width: 639px)',
      md: 'only screen and (max-width: 1023px)',
      lg: 'only screen and (max-width: 1279px)',
      xl: 'only screen and (max-width: 1599px)',
      xxl: 'only screen and (min-width: 0)',
    },

    columns: {
      xxs: 2,
      xs: 4,
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
      xxl: 16
    }
  },
  
  box: {
    // Default properties provided to the <Box> on each render
    defaultProps: {},

    // Default spacing scale for margins and padding
    spacingScale: [
      0,          // 0 [0px]
      (1/4) * 16, // 1 [4px]
      (1/2) * 16, // 2 [8px]
      16,         // 3 [16px]
      2 * 16,     // 4 [32px]
      4 * 16,     // 5 [64px]
      8 * 16,     // 6 [128x]
      16 * 16,    // 7 [256px]
      32 * 16     // 8 [512px]
    ],

    // Default border-width scale
    borderWidthScale: [
      0,          // 0 [0px]
      1,          // 1 [1px]
      2,          // 2 [2px]
      4,          // 3 [4px]
      6,          // 4 [6px]
      10          // 5 [10px]
    ],

    // Default border-radius scale
    borderRadiusScale: [
      0,          // 0 [0px]
      (1/4) * 16, // 1 [4px]
      (1/2) * 16, // 2 [8px]
      16,         // 3 [16px]
      2 * 16,     // 4 [32px]
      1000 * 16   // 5 [16000px]
    ],

    // Default box-shadow callback
    getBoxShadow: function (dp, theme) {
      dp = parseInt(dp)

      if (dp === 0) {
        return
      }

      const ambientY = dp
      let ambientAlpha = (dp + 10) / 100
      ambientAlpha = ambientAlpha > 0.24 ? 0.24 : ambientAlpha
      const ambientBlur = dp === 1 ? 3 : dp * 1.5
      let shadow = \`\px \${ambientY}px \${ambientBlur}px rgba(0, 0, 0, \${ambientAlpha})\`
      const directY = dp / 3
      const directBlur = dp === 1 ? 3 : dp * 1.618
      const directAlpha = (24 - (dp / 20)) / 100
      shadow = \`\${shadow}, 0 \${directY}px \${directBlur}px rgba(0, 0, 0, \${ambientAlpha})\`

      return css\`
        box-shadow: \${shadow};
      \`
    }
  }
}
`


const details = `
You can override the scales with as many or few scale values as you'd like.
See the [theming](/theming) page for more info about overriding defaults.

Theme colors can be found on the [defaultColors](defaultColors) page.
`


export default {details, example}
