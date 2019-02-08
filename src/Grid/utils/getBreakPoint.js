import json2mq from 'json2mq'
import {css} from '@emotion/core'

export default function (size, theme) {
  const bp = theme.breakpoints[size]
  return typeof bp === 'string' ? css(bp) : json2mq(bp)
}
