import json2mq from 'json2mq'


export default function (size, theme) {
  const bp = theme.breakpoints[size]
  return typeof bp === 'string' ? bp : json2mq(bp)
}
