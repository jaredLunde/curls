export default `
  \`Flex\` is a "render prop" or "child as function" component which provides
  flex-specific styles via a \`className\` property to its child function.

  \`\`\`
  <Flex flex column>
    {({className}) => <div className={className}/>}
  </Flex>
  \`\`\`
`
