export default `
  \`Flex\` is a "render prop" or "function as child" component which provides
  flex-specific styles via a \`className\` property to its child function.

  \`\`\`
  <Flex flex column randomProp='some-id'>
    {({className, randomProp}) => <div className={className}/>}
  </Flex>
  \`\`\`
`
