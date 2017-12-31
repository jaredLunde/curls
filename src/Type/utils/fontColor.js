import {css} from 'emotion'


export default function fontColor (props, colors) {
  const propKeys = Object.keys(props)

  for (let x = propKeys.length - 1; x > -1; x--) {
    const key = propKeys[x]

    if (props[key] === true && colors[key] !== void 0) {
      return css`color: ${colors[key]}`
    }
  }
}
