import {css} from 'emotion'
import {colorizeProps, withHoverQuery} from '../../utils'


export default function buttonColor (props, theme) {
  const backgroundColor = colorizeProps(
    'background-color',
    props,
    theme,
    theme.defaultColor
  )
  const hoverBackgroundColor = colorizeProps(
    'background-color',
    props,
    theme.hover,
    theme.defaultColor
  )
  const activeBackgroundColor = colorizeProps(
    'background-color',
    props,
    theme.active,
    theme.defaultColor
  )

  const style = css`
    ${backgroundColor};
  `

  const hoverStyle = css`
    &:hover {
      cursor: pointer;
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
      cursor: pointer;
      ${activeBackgroundColor};
    }
  `

  return css`
    ${style}
    ${withHoverQuery(hoverStyle, noneStyle)}
    ${activeStyle}
  `
}
