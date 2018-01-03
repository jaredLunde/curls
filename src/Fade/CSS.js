import {css} from 'emotion'


export const baseIsNotVisible = css`visibility: hidden;`
export const baseIsVisible = css`visibility: visible;`

export const isVisible_ = css`${baseIsVisible}; opacity: 1.0;`
export const isNotVisible_ = css`${baseIsNotVisible}; opacity: 0;`


export function isVisible (value, theme, props) {
  return (
    value === true
    ? css`${baseIsVisible}; opacity: ${props.to};`
    : css`${baseIsNotVisible}; opacity: ${props.from};`
  )
}
