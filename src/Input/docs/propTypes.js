import typeProps from '../../Type/docs/propTypes'

const ptypes = {...typeProps}
delete ptypes.nodeType
delete ptypes.children
ptypes.center = {...ptypes.center}
delete ptypes.center.defaultValue
ptypes.lg = {...ptypes.lg}
delete ptypes.lg.defaultValue
ptypes.antialias = {...ptypes.antialias}
delete ptypes.antialias.defaultValue
ptypes.w = {...ptypes.w}
ptypes.w.defaultValue = 280
ptypes.p = {...ptypes.p}
ptypes.p.defaultValue = '3'
ptypes.br = {...ptypes.br}
ptypes.br.defaultValue = 1
ptypes.sh = {...ptypes.sh}
ptypes.sh.defaultValue = 2

export default ptypes
