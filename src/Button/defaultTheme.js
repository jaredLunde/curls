import {css} from 'emotion'
import {lighten, darken} from 'polished'
import {withHoverQuery} from '../utils'
import {defaultColors, defaultHoverColors, defaultActiveColors} from '../theming'


export const sizes = {
  xxs: css`padding: 12px 6px;`,
  xs: css`padding: 16px 8px;`,
  sm: css`padding: 20px 10px;`,
  md: css`padding: 24px 12px;`,
  lg: css`padding: 32px 16px;`,
  xl: css`padding: 40px 20px;`,
  xxl: css`padding: 48px 24px;`,
}


export const defaultProps = {
  flex: true,
  row: true,
  align: 'center',
  justify: 'center',
  br: 5,
  bw: 1,
  bc: 'translucentLight',
  bg: 'translucentDark',
  sm: true,
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


export const colors = defaultColors
