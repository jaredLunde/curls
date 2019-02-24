import json2mq from 'json2mq'
import fastMemoize from './fastMemoize'
import toSize from './toSize'


export default fastMemoize(
  'getMediaQuery',
  bp =>
    isNaN(bp) === false
      ? `only screen and (min-width: ${toSize(bp, 'em')})`
      : typeof bp === 'string'
        ? bp
        : json2mq(bp),
  Map
)