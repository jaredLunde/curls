import {css} from 'emotion'


export default function buttonSize (size, theme) {
  const scale = theme.scale[size]

  return css`padding: ${scale.y}rem ${scale.x}rem;`
}
