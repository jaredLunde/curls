import {css} from '@emotion/core'
import {colorize} from '../utils'

export function getPlaceholderClass (theme, props) {
  return css`
    opacity: 0.8;
    ${colorize('color', props.color, theme)};
  `
}

export function getHoverClass (theme, props) {
  return
}

export function getFocusClass (theme, props) {
  return
}

export const defaultProps = {
  size: 'sm',
  p: 'x3 y2',
  bw: 1,
  br: 5
}
