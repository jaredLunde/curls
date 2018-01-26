import typeProps from '../propTypes'

const ptypes = {...typeProps}
ptypes.nodeType = {...ptypes.nodeType}
ptypes.nodeType.description = 'The type of React element created when rendered. The default value is `p`.'
ptypes.children = {...ptypes.children}
ptypes.children.example = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras diam massa, tempus vel dui id, suscipit laoreet est. Aliquam vel mi arcu. Donec quis facilisis massa. Proin euismod ornare dui, ut condimentum turpis vehicula vel. Integer accumsan neque eu gravida blandit. Morbi a viverra mauris, eu tempus tellus. Cras et nisi sapien. Nunc tincidunt fermentum neque, condimentum accumsan arcu suscipit in. Aenean sit amet porta tellus.'
ptypes.center = {...ptypes.center}
delete ptypes.center.defaultValue
ptypes.lg = {...ptypes.lg}
delete ptypes.lg.defaultValue
ptypes.antialias = {...ptypes.antialias}
delete ptypes.antialias.defaultValue
ptypes.w = {...ptypes.w}
ptypes.w.defaultValue = 280

export default ptypes
