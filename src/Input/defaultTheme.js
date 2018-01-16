import {css} from 'emotion'
import {colorize} from '../utils'

export colors from '../theming/defaultColors'
export function getPlaceholderClass (props, theme) {
  return css`
    opacity: 0.8;
    ${colorize('color', props.color, theme)};
  `
}

export function getHoverClass (props, theme) {
  return
}

export function getFocusClass (props, theme) {
  return
}

export const defaultProps = {
  bg: 'white',
  p: 2,
  bc: 'translucentLight',
  bw: 1,
  br: 5,
  color: 'darkGrey',
  light: true,
  sm: true
}
