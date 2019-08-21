import {css} from '@emotion/core'
import {colorize} from '../utils'

export function getPlaceholderClass(theme, props) {
  return css`
    opacity: 0.8;
    ${colorize('color', props.color, theme)};
  `
}
export const getHoverClass = () => {}
export const getFocusClass = () => {}
