import {css} from '@emotion/core'
import {withHoverQuery} from '../utils'
// export colors from '../theming/defaultColors'

export const scale = {
  xxs: css`padding: 6px 12px;`,
  xs: css`padding: 8px 16px;`,
  sm: css`padding: 12px 24px;`,
  md: css`padding: 16px 32px;`,
  lg: css`padding: 20px 40px;`,
  xl: css`padding: 24px 48px;`,
  xxl: css`padding: 30px 60px;`,
}

export const defaultProps = {
  br: 5,
  bw: 1,
  bg: 'white',
  sm: true,
  role: 'button'
}


export function getHoverClass (props, theme) {
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


export function getActiveClass (props, theme) {
  if (props.bg === void 0) {
    return
  }

  return css`
    &:active {
      opacity: 1.0;
    }
  `
}
