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
  }
}
`


const details = `
Theme \`breakpoints\` are media queries provided in the form of either strings
or objects conforming to the library [json2mq](https://github.com/akiran/json2mq).

Theme \`columns\` dictate the number of breakpoints to horizontally split the
users screen into.
`


export default {details, example}
