import {css} from 'emotion'
import {colorize, withHoverQuery} from '../../utils'


export default function (value, theme) {
  value = value === null ? theme.defaultColor : value
  const color = colorize('color', value, theme)
  const hoverStyle = css`
    &:hover {
      ${colorize('color', value, theme.hover)};
    }
  `
  const noneStyle = css`
    &:hover {
      ${color};
    }
  `

  return css`
    ${color};
    ${withHoverQuery(hoverStyle, noneStyle)};
  `
}
