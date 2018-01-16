import {css} from 'emotion'
import {lighten} from 'polished'
import {withHoverQuery} from '../utils'

export colors from '../theming/defaultColors'

export function getHoverClass (props, theme) {
  // adds css classes for hover and active states
  const color = props.color
  const hoverStyle = css`
    &:hover {
      color: ${lighten(0.05, theme.colors[color])};
    }
  `

  const noneStyle = css`
    &:hover {
      color: ${theme.colors[color]};
    }
  `

  return css`${withHoverQuery(hoverStyle, noneStyle)}`
}

export function getActiveClass (props, theme) {
  return
}

export const defaultProps = {
  color: 'blue'
}
