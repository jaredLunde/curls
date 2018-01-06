import {css} from 'emotion'
import {colorizeProps, withHoverQuery} from '../../utils'


export default function (props, theme) {
  const color = colorizeProps(
    'color',
    props,
    theme,
    theme.defaultColor
  )

  const hoverColor = colorizeProps(
    'color',
    props,
    theme.hover,
    theme.defaultColor
  )

  const style = css`
    ${color};
  `

  const hoverStyle = css`
    &:hover {
      ${hoverColor};
    }
  `

  const noneStyle = css`
    &:hover {
      ${color};
    }
  `

  return css`
    ${style}
    ${withHoverQuery(hoverStyle, noneStyle)}
  `
}
