import {css} from '@emotion/core'
import {getHoverQuery} from '../utils'


export const scale = {
  sm: css`padding: 0.67rem 1.33rem;`,
  md: css`padding: 1rem 2rem;`,
  lg: css`padding: 1.5rem 3rem;`
}

export const getHoverClass = theme => {
  // adds css classes for hover and active states
  const hoverStyle = `
    &:hover {
      opacity: 0.8;
    }
  `

  const noneStyle = `
    &:hover {
      opacity: 1.0;
    }
  `

  return getHoverQuery(hoverStyle, noneStyle)
}

export const getActiveClass = (theme, props) => {
  if (props.bg === void 0) return
  return css`
    &:active {
      opacity: 1.0;
    }
  `
}
