import {css} from '@emotion/core'


export const __linkStyles = (_, theme, props) => ([
  theme.getHoverClass(theme, props),
  theme.getActiveClass(theme, props),
])