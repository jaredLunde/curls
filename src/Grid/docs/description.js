export default `
\`Grid\` is a "render prop" or "function as child" component which provides a
system for defining the number of columns that a child component should occupy
at various media query breakpoints.


If you're unfamiliar with grid systems, [Bootstrap has a very thorough guide](https://v4-alpha.getbootstrap.com/layout/grid/).

Unlike Bootstrap, Curls uses different column counts at each breakpoint by
default. You can override this by injecting your own theme with the
[injectTheme](injectTheme) function. You can also override the breakpoint
media queries. The default theme is below.
`
