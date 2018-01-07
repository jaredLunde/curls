import {css} from 'emotion'
import {colorize, withHoverQuery} from '../../utils'


export default function buttonColor (color, theme) {
  const backgroundColor = colorize('background-color', color, theme)
  const hoverBackgroundColor = colorize('background-color', color, theme.hover)
  const activeBackgroundColor = colorize('background-color', color, theme.active)

  const style = css`
    ${backgroundColor};
  `

  const hoverStyle = css`
    &:hover {
      ${hoverBackgroundColor};
    }
  `

  const noneStyle = css`
    &:hover {
      ${backgroundColor};
    }
  `

  const activeStyle = css`
    &:active {
      ${activeBackgroundColor};
    }
  `

  return css`
    ${style}
    ${withHoverQuery(hoverStyle, noneStyle)}
    ${activeStyle}
  `
}
