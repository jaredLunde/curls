import memoize from 'memoize-two-args'
import json2mq from 'json2mq'


export default memoize(
  (size, theme) => {
    const bp = theme.breakPoints[size]
    return `@media ${typeof bp === 'string' ? bp : json2mq(bp)}`
  },
  Map
)