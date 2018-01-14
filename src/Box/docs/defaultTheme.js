const example = `
{
  box: {
    spacingScale: [
      0,          // 0
      (1/4) * 16, // 1
      (2/4) * 16, // 2
      16,         // 3
      2 * 16,     // 4
      4 * 16,     // 5
      8 * 16,     // 6
      16 * 16,    // 7
    ],
    borderWidthScale: [
      0,          // 0
      1,          // 1
      2,          // 2
      4,          // 3
      6,          // 4
      10          // 5
    ],
    borderRadiusScale: [
      0,          // 0
      (1/4) * 16, // 1
      (1/2) * 16, // 2
      16,         // 3
      2 * 16,     // 4
      1000 * 16   // 5
    ],
    colors: defaultColors,
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
Theme \`defaultColors\` can be found on the [defaultColors](defaultColors) page.

You can override the scales with as many or few scale values as you'd like, but
they must be in rem.
`


export default {details, example}
