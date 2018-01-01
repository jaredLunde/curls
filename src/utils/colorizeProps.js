import {css} from 'emotion'
import colorize from './colorize'


export default function colorizeProps (property, props, theme, defaultColor) {
  const propKeys = Object.keys(props)

  for (let x = propKeys.length - 1; x > -1; x--) {
    const key = propKeys[x]

    if (props[key] === true && theme.colors[key] !== void 0) {
      return colorize(property, key, theme)
    }
  }

  if (theme.colors[defaultColor]) {
    return colorize(property, defaultColor, theme)
  }
}
