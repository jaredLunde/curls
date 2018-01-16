import {css} from 'emotion'
import {lighten, darken} from 'polished'
import {withHoverQuery} from '../utils'


export colors from '../theming/defaultColors'

export const sizes = {
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
  bc: 'translucentLight',
  bg: 'translucentDark',
  md: true,
  role: 'button'
}


export function getHoverClass (props, theme) {
  // adds css classes for hover and active states
  const bg = props.bg
  const hoverStyle = css`
    &:hover {
      background-color: ${lighten(0.05, theme.colors[bg])};
    }
  `

  const noneStyle = css`
    &:hover {
      background-color: ${theme.colors[bg]};
    }
  `

  return css`${withHoverQuery(hoverStyle, noneStyle)}`
}


export function getActiveClass (props, theme) {
  return css`
    &:active {
      background-color: ${darken(0.05, theme.colors[props.bg])};
    }
  `
}
