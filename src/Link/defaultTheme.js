import {css} from '@emotion/core'
import {withHoverQuery} from '../utils'


export function getHoverClass (theme, props) {
  // adds css classes for hover and active states
  const color = props.color
  const hoverStyle = css`
    &:hover {
      opacity: 0.8;
    }
  `

  const noneStyle = css`
    &:hover {
      opacity: 1.0;
    }
  `

  return css`${withHoverQuery(hoverStyle, noneStyle)}`
}

export function getActiveClass (theme, props) {
  return
}

export const defaultProps = {
  color: 'blue'
}
