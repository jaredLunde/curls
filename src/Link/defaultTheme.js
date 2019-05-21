import {getHoverQuery} from '../utils'


export const getHoverClass = (theme, props) => {
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

export const getActiveClass = (theme, props) => {}

export const defaultProps = {
  color: 'blue'
}
