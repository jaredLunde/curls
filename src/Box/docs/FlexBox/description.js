export default `
\`FlexBox\` is a "render prop" or "function as child" component which provides
both \`Flex\` and \`BasicBox\` styles via a \`className\` property to its child
function.

\`\`\`
<FlexBox bg='blue' flex column randomProp='some-id'>
  {({className, randomProp}) => <div className={className}/>}
</FlexBox>
\`\`\`
`
