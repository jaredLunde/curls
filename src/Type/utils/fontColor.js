import {css} from 'emotion'
import {colorize} from '../../utils'


export default function fontColor (props, theme) {
  const propKeys = Object.keys(props)

  for (let x = propKeys.length - 1; x > -1; x--) {
    const key = propKeys[x]

    if (props[key] === true && theme.colors[key] !== void 0) {
      return colorize('color', key, theme)
    }
  }
}
