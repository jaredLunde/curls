import {css} from '@emotion/core'

export const from = () => null
export const to = () => null
export const baseIsNotVisible = css`visibility: hidden;`
export const baseIsVisible = css`visibility: visible;`
export const isVisible_ = css`${baseIsVisible}; opacity: 1.0;`
export const isNotVisible_ = css`${baseIsNotVisible}; opacity: 0;`
export const isVisible = (value, _, props) => (
  value === true
    ? props.to === 1
      ? isVisible_
      : css`${baseIsVisible}; opacity: ${props.to};`
    : props.from === 0
      ? isNotVisible_
      : css`${baseIsNotVisible}; opacity: ${props.from};`
)