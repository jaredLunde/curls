export default `
\`BasicBox\` is a "render prop" or "function as child" component which provides
special props for adding 'box-type' styles (such as margin, padding, background)
via a \`className\` property to its child function.

\`\`\`
<BasicBox bg='blue' m='b2' randomProp='some-id'>
  {({className, randomProp}) => <div className={className}/>}
</BasicBox>
\`\`\`
`
