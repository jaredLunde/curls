import {css} from '@emotion/core'
import {withHoverQuery} from '../utils'


export const scale = {
  xxs: css`padding: 0.375rem 0.75rem;`,
  xs: css`padding: 0.5rem 1rem;`,
  sm: css`padding: 0.75rem 1.5rem;`,
  md: css`padding: 1rem 2rem;`,
  lg: css`padding: 1.25rem 2.5rem;`,
  xl: css`padding: 1.5rem 3rem;`,
  xxl: css`padding: 1.875rem 3.75rem;`,
}

export const defaultProps = {
  br: 5,
  bw: 1,
  sm: true,
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

  return css`${withHoverQuery(hoverStyle, noneStyle)}`
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
