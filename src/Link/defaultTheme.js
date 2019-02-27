import {getHoverQuery} from '../utils'


export function getHoverClass (theme, props) {
  // adds css classes for hover and active states
  const color = props.color
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

export function getActiveClass (theme, props) {
  return
}

export const defaultProps = {
  color: 'blue'
}
