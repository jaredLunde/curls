import typeProps from '../propTypes'

const ptypes = {...typeProps}
ptypes.nodeType = {...ptypes.nodeType}
ptypes.nodeType.description = 'The type of React element created when rendered. The default value is `h4`.'
ptypes.center = {...ptypes.center}
delete ptypes.center.defaultValue
ptypes.lg = {...ptypes.lg}
delete ptypes.lg.defaultValue
ptypes.bg = {...ptypes.bg}
delete ptypes.bg.defaultValue
ptypes.sh = {...ptypes.sh}
delete ptypes.sh.defaultValue
ptypes.bw = {...ptypes.bw}
delete ptypes.bw.defaultValue
ptypes.bc = {...ptypes.bc}
delete ptypes.bc.defaultValue
ptypes.br = {...ptypes.br}
delete ptypes.br.defaultValue
ptypes.w = {...ptypes.w}
delete ptypes.w.defaultValue
ptypes.antialias = {...ptypes.antialias}
delete ptypes.antialias.defaultValue

export default ptypes
