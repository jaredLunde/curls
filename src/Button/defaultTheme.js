import {css} from '@emotion/core'
import {getHoverQuery} from '../utils'


export const scale = {
  sm: css`padding: 0.67rem 1.33rem;`,
  md: css`padding: 1rem 2rem;`,
  lg: css`padding: 1.5rem 3rem;`
}

export const defaultProps = {
  br: 5,
  bw: 1,
  size: 'sm',
  role: 'button'
}

export function getHoverClass (theme, props) {
  // adds css classes for hover and active states
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

  return css`${getHoverQuery(hoverStyle, noneStyle)}`
}

export function getActiveClass (theme, props) {
  if (props.bg === void 0) {
    return
  }

  return css`
    &:active {
      opacity: 1.0;
    }
  `
}
