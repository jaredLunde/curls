import {css} from '@emotion/core'


export function __linkStyles (_, theme, props) {
  return [
    theme.getHoverClass(theme, props),
    theme.getActiveClass(theme, props),
  ]
}
